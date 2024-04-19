import './../css/uploadbook.css';
import { useEffect, useState } from 'react';
import { sendPatchRequest } from '../utils/api';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { sendGetRequest } from '../utils/api';
import { toast } from 'react-toastify';

const UpdateBook = ({book, closeModal, getBooks}) => {
  const animatedComponents = makeAnimated();
  const [image, setImage] = useState(`http://127.0.0.1:8000${book.image}`);
  const [formData, setFormData] = useState({ 
    title: book.title,
    author: book.author,
    genre: null,
    image: null 
  });
  const [genres, setGenres] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    setFormData({ ...formData, image: file });
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('author', formData.author);
      formDataToSend.append('genre', formData.genre.value);
  
      if (formData.image !== null) {
        formDataToSend.append('image', formData.image);
      }
  
      await sendPatchRequest(`update_book/${book.id}`, formDataToSend);
      closeModal();
      getBooks();
    } catch (error) {
      console.log(error);
    }
  }

  const handleTitleChange = (e) => {
    setFormData({ ...formData, title: e.target.value });
  }

  const handleAuthorChange = (e) => {
    setFormData({ ...formData, author: e.target.value });
  }

  const handleGenreChange = (selectedOption) => {
    setFormData({ ...formData, genre: selectedOption });
  }

  const GetGenres = async () => {
    try {
      const response = await sendGetRequest('genres');
      const formattedGenres = response.map(genre => ({ label: genre.name, value: genre.id }));
      setGenres(formattedGenres);

      const defaultGenre = formattedGenres.find(genre => genre.value === book.genre.id);
      if (defaultGenre) {
        setFormData({ ...formData, genre: defaultGenre });
      }
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  useEffect(() => {
    GetGenres();
  }, []);

  return (
    <>
      <div className='book-form' style={{marginLeft:'-70px'}}>
        <form method='post'>
          <div className='image mt-20'>
            <img 
              src={image} 
              id="image" 
              alt='' 
              style={{width: '300px'}} 
            />
            <input 
              type="file" 
              accept='image/jpeg,image/jpg,image/png' 
              id='image-input' 
              onChange={handleImageChange}
            />
            <button className='button' onClick={(e) => {
              e.preventDefault();
              document.getElementById('image-input').click();
            }}>Change Image</button>
          </div>
          <div className='form' style={{marginTop: '-20px'}}>
            <div className='form-content mt-0'>
              <label htmlFor="title">Title:</label><br />
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleTitleChange}
              />
              <label htmlFor="author">Author:</label><br />
              <input
                type="text"
                name="author"
                id="author"
                value={formData.author}
                onChange={handleAuthorChange}
              />
              <label htmlFor="genre">Genres :</label>
              <Select
                id="genre"
                closeMenuOnSelect={false}
                components={animatedComponents}
                className="select"
                options={genres}
                value={formData.genre}
                onChange={handleGenreChange}
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
              <button className='button' onClick={handleUpdate}>Update Book</button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default UpdateBook;
