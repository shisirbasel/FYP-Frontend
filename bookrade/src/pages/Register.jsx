import React, { useState } from 'react';
import './../css/register.css';
import {useNavigate} from 'react-router-dom';

const Register = () => {
  const BASE_URL = "http://127.0.0.1:8000/api/";

  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetch(`${BASE_URL}register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        navigate('/login')
      })
      .catch(error => {
        console.log(error);
      });
  };

  const togglePasswordVisibility = () => {
    var password_1 = document.getElementById("password1");
    var password_2 = document.getElementById("password2");

    if (password_1.type === "password") {
      password_1.type = "text";
      password_2.type = "text";
    } else {
      password_1.type = "password";
      password_2.type = "password";
    }
  };

  return (
    <div className='content'>
      <div className='headings'>
        <h1 className='title'>Welcome to Bookrade! </h1>
        <div className="message">
          <h1>Register your account to explore and trade books.</h1>
        </div>
      </div>

      <div className='card_register'>
        <h1 className='form_title'>Sign Up</h1>

        <form action="" className="form">
          <div className='names'>
            <div className="fieldsf">
              <label htmlFor="firstname">First Name:</label><br />
              <input
                type="text"
                name="firstname"
                id="firstname"
                onChange={e => setFormData({ ...formData, first_name: e.target.value })}
              />
            </div>
            <div className='fieldsl'>
              <label htmlFor="lastname">Last Name: </label><br />
              <input
                type="text"
                name="lastname"
                id="lastname"
                onChange={e => setFormData({ ...formData, last_name: e.target.value })}
              />
            </div>
          </div>

          <label htmlFor="email">Email:</label><br />
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />

          <label htmlFor="username">Username:</label><br />
          <input
            type="text"
            name="username"
            id="username"
            onChange={e => setFormData({ ...formData, username: e.target.value })}
          />

          <div className='passwords'>
            <div className="password1">
              <label htmlFor="password1">Password:</label><br />
              <input
                type="password"
                name="password1"
                id="password1"
                onChange={e => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div className='password2'>
              <label htmlFor="password2">Re-Password:</label><br />
              <input type="password" name="password2" id="password2" />
            </div>
          </div>
          <div className='check_box'>
            <input type="checkbox" id="myCheckbox" className="checkbox" onClick={togglePasswordVisibility}></input>
            <label htmlFor="myCheckbox" className='checkbox_label'>Show Password</label>
          </div>

          <input
            type="submit"
            value="Sign Up"
            className="button"
            onClick={handleFormSubmit} /><br />
        </form>
      </div>
    </div>
  );
}

export default Register;
