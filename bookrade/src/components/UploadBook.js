import React from 'react';
import './../css/uploadbook.css';
import image from './../Assets/images/add-image.jpg';
import { useState } from 'react';
import { sendPostRequest } from '../utils/api';
import { toast } from 'react-toastify';


const UploadBook = () => {
  const [formData, setFormData] = useState({
    'title': '',
    'author': '',
    'image': null
  });

  const handleImageChange = (e) => {
    e.preventDefault();
    const default_image = document.getElementById("image");
    console.log(default_image)
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
    const responseData = await sendPostRequest('add_book', formDataToSend);
    console.log(responseData)
  };


  return (
    <>
    <div className='book-form'>
      <form method='post'>
        <div className='image'>
        <h1 className='form-title'>Upload a Book</h1>
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
              <button className='button' onClick={handleFormSubmit} >Upload</button>
        </div>
          </div>
      </form>
      </div>
    </>
    
    
  )
}

export default UploadBook;
