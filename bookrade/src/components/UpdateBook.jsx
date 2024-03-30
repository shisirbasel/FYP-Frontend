import './../css/uploadbook.css';
import image from './../assets/images/add-image.jpg';
import { useEffect, useState } from 'react';
import { sendPatchRequest } from '../utils/api';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { sendGetRequest } from '../utils/api';

const UpdateBook = ({book}) => {
  const animatedComponents = makeAnimated();

 

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

  

  return (
    <>
    <div className='book-form'>
      <form method='post'>
        <div className='image'>
          <h1 className='text-5xl text-green-700' >Upload a Book</h1>
          <label htmlFor='image-input'>
            <img src={book.image} id="image" alt='' />
          </label>
          <input
            type='file'
            accept='image/jpeg,image/jpg,image/png'
            id='image-input'
          />
        </div>
        <div className='form'>
          <div className='form-content'>
            <label htmlFor="title">Title:</label><br />
            <input
              type="text"
              name="title"
              id="title"
              value={book.title}
            />
            <label htmlFor="author">Author:</label><br />
            <input
              type="text"
              name="author"
              id="author"
              value={book.author}
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
            <button className='button'>Upload</button>
          </div>
        </div>
      </form>
    </div>
  </>

  )
}

export default UpdateBook