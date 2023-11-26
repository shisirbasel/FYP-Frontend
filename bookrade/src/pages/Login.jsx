import React from 'react'
import './../css/login.css'
import { useState } from 'react'
import image from '../images/loginimage.png'
const Login = () => {

    const BASE_URL = "http://127.0.0.1:8000/api/";

    const [formData ,setFormData] = useState({
      'email': '',
      'password': '',
    })
  
    const handleFormSubmit = (e) =>{
          e.preventDefault();  
          fetch(`${BASE_URL}login/`,{
          method : 'POST',
          headers : {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        })
        .then(response => "User Logged In")
        .then(data => {
          console.log(data);
        })
        .catch(error =>{
          console.log(error);
        })
      }

    const togglePasswordVisibility = () => {
        var passwordInput = document.getElementById("password");
        var eyeIcon = document.getElementById("eye-icon");

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            eyeIcon.className = "fas fa-eye";
        } else {
            passwordInput.type = "password";
            eyeIcon.className = "fas fa-eye-slash";
        }
    }

  return (
    <>  
        <h1 className='heading'>Welcome Back. </h1>

        <div className ='show'>

        
            <div className='image'>
                <img src={image} alt="" />
            </div>

            <div className='card_login'>

                <h1 className='form_title'>Login</h1>
                
                <div className="form">
                    <div className="input">
                        <form action="" method="POST">
                            <label htmlFor="Email">Email:</label><br />
                            <input 
                            type="text"
                            name="email" 
                            id="email" 
                            onChange={e => setFormData({...formData, email: e.target.value})}/>

                            <div className="password-input">
                                <label htmlFor="password">Password:</label><br />
                                <input 
                                type="password" 
                                name="password" 
                                id="password"
                                onChange={e => setFormData({...formData, password: e.target.value})}
                                />
                                <i id="eye-icon" className="fas fa-eye-slash" onClick={togglePasswordVisibility}></i>
                            </div>

                            <input type="submit" value="Login" className="button" onClick={handleFormSubmit} /><br />
                        </form>
                    {/* <Link to="/register">Register</Link> */}
                    </div>
                </div>
            </div>
        
        </div>
        
    </>
  )
} 

export default Login