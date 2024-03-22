import './../css/uploadbook.css';
import image from './../assets/images/add-image.jpg';
import { useEffect, useState } from 'react';
import { sendPostRequest } from '../utils/api';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { sendGetRequest } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const UploadBook = () => {
  const navigate = useNavigate();
  const animatedComponents = makeAnimated();

  const [formData, setFormData] = useState({
    'title': '',
    'author': '',
    'image': null,
    'genre': null,
  });

  const [genres, setGenres] = useState([]);

  const GetGenres = async () => {
    try {
      const response = await sendGetRequest('genres');
      const formattedGenres = response.map(genre => ({ label: genre.name, value: genre.id }));
      setGenres(formattedGenres);
      return formattedGenres;
    } catch (error) {
      console.error('Error fetching genres:', error);
      return [];
    }
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const default_image = document.getElementById("image");
    if (default_image) {
      const input_image = e.target;
      default_image.src = URL.createObjectURL(input_image.files[0]);
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      console.error("Element with ID 'image' not found");
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('image', formData.image);
    formDataToSend.append('author', formData.author);
    
    // Append selected genre(s) to formDataToSend
    if (formData.genre) {
      formDataToSend.append('genre', formData.genre.value)
    }
    
    const responseData = await sendPostRequest('add_book', formDataToSend);
    console.log(responseData);
    navigate('/explore')
  };

  useEffect(()=>{
    GetGenres();
  },[]);

  return (
    <>
      <div className='book-form'>
        <form method='post'>
          <div className='image'>
            <h1 className='text-5xl text-green-700' >Upload a Book</h1>
            <label htmlFor='image-input'>
              <img src={image} id="image" alt='' />
            </label>
            <input
              type='file'
              accept='image/jpeg,image/jpg,image/png'
              id='image-input'
              onChange={handleImageChange}
            />
          </div>
          <div className='form'>
            <div className='form-content'>
              <label htmlFor="title">Title:</label><br />
              <input
                type="text"
                name="title"
                id="title"
                onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
              <label htmlFor="author">Author:</label><br />
              <input
                type="text"
                name="author"
                id="author"
                onChange={e => setFormData({ ...formData, author: e.target.value })}
              />
              <label htmlFor="genre">Genres :</label>
              <Select
                id="genre"
                closeMenuOnSelect={false}
                components={animatedComponents}
                className="select"
                options={genres}
                onChange={(selectedOption) => setFormData({ ...formData, genre: selectedOption })}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    borderColor: state.isFocused ? 'green' : provided.borderColor,
                    boxShadow: state.isFocused ? '0 0 0 1px #27ae60' : provided.boxShadow,
                    width: '100%',
                    fontSize: '16px',
                  }),
                }}
              />
              <button className='button' onClick={handleFormSubmit} >Upload</button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default UploadBook;
