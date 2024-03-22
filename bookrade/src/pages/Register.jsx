import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios'; 
import './../css/register.css';
import VerifyOtp from '../components/VerifyOtp';
import { Modal } from 'antd';

const Register = () => {
  const BASE_URL = "http://127.0.0.1:8000/api/";
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    username: '',
    password: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    toast.error("Your Account hasnot been verified yet! Please verify when Login.")
    setIsModalOpen(false);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    var password_1 = document.getElementById("password1");
    var password_2 = document.getElementById("password2");

    if (password_1.value==="" || password_2.value===""){
      toast.error("Password mustn't be Empty")
      return null;
    }
    else if (password_1.value !== password_2.value) {
      toast.error("Password Don't Match, Please Try Again")
      return null;
    }
    else{
      try{
        const response = await axios.post(`${BASE_URL}register/`, formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          toast.success("Registration Successul, Please Verify your Account Now.")
          setIsModalOpen(true)
      }
      catch(error){
        if(error.response.status ===400){
        let errorMessage = '';
        for (const field in error.response.data) {
          if (Array.isArray(error.response.data[field])) {
            errorMessage = error.response.data[field][0];
            break; 
            }
          }
          toast.error(errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1));
        }
        else{
          toast.error("A Problem Occured, Please Try Again")
        }
      }
    }
    
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
    <>
      <div className='content'>
      <div className='headings'>
        <h1 className='title'>Welcome to Bookrade! </h1>
        <div className="message">
          <h1 style={{fontSize:"24px"}}>Register now for a unique book trading experience and join our vibrant literary community.</h1>
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
            onClick={handleFormSubmit} 
            /><br />
        </form>
        <Link className="text-2xl text-green-700 float-right hover:underline" to="/login">Already have an account? Login</Link>

      </div>

      <Modal title="Account Verification" footer={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className='flex justify-center items-center'>

          <VerifyOtp />

        </div>
      </Modal>
    </div>
    
    
    
    </>
  );
}

export default Register;
