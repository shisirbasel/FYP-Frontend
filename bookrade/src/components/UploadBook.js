import React from 'react';
import './../css/uploadbook.css';
import image from './../images/add-image.jpg';
import { useState } from 'react';

const UploadBook = () => {
  const BASE_URL = "http://127.0.0.1:8000/api/";

  const token = JSON.parse(localStorage.getItem('token'));


  const [formData, setFormData] = useState({
    'title': '',
    'author': '',
    'image': null
  });

  const handleImageChange = (event) => {
    event.preventDefault();
    const default_image = document.getElementById("image");
    console.log(default_image)
    if (default_image) {
      const input_image = event.target;
      default_image.src = URL.createObjectURL(input_image.files[0]);
      setFormData({ ...formData, image: event.target.files[0] });
    } else {
      console.error("Element with ID 'image' not found");
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('image', formData.image);
    formDataToSend.append('author', formData.author);

    fetch(`${BASE_URL}add_book/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      })
  };


  return (
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
  )
}

export default UploadBook;


{/* <label htmlFor="genre">Genre:</label><br />
                <input
                  type="text"
                  name="genre"
                  id="genre"
                  // onChange={e => setFormData({ ...formData, email: e.target.value })}
                /> */}