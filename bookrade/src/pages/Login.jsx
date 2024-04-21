import './../css/login.css';
import { useEffect, useState } from 'react';
import image from '../assets/images/loginimage.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {  toast } from 'react-toastify';
import {useDispatch, useSelector} from "react-redux"
import { loginSuccess } from '../state/authSlice';
import VerifyOtp from '../components/VerifyOtp';
import { Modal } from 'antd';
import { getUser } from '../utils/user';


const Login = () => {

  const isLoggedIn = useSelector((state)=>state.auth.isLogin)
  
  const dispatch = useDispatch();
  const BASE_URL = "http://127.0.0.1:8000/api/";

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const [formData, setFormData] = useState({
    'email': '',
    'password': '',
  });

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}login/`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      saveToken(response.data);
  
      if (response.status === 200) {
        toast.success("Login Successful!")
        dispatch(loginSuccess())
        const is_admin = getUser();
  
        is_admin? navigate('/admin/dashboard') : navigate('/')
      }
    } catch (error) {
      console.log(error)
      if (error.response) {
        if (error.response.status === 401) {
      
          toast.error("Invalid Email or Password");
        } else if (error.response.status === 403) {
            if (!error.response.data.is_verified) {
              toast.error("Your Account is not Verified");
              showModal()
            }
            else{
              toast.error(error.response.data.message)
            }
          console.log(error.response)
        }
        else{
          toast.error("Please enter your Email and Password")
        }
      } else {
        toast.error("Error Occurred. Please Try Again Later.");
      }
    }
  };

  const saveToken = (token) => {
      localStorage.setItem('token', token.access);
      localStorage.setItem('refresh', token.refresh);
      localStorage.setItem('isAdmin', JSON.stringify(token.is_admin));
      navigate('/');
  };

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
  };

  useEffect(()=>{if (isLoggedIn){
    navigate('/'), []
  }})

  return (
    <>

      <h1 className='heading'>Welcome Back. </h1>

      <div className='show'>
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
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
                <div className="password-input">
                  <label htmlFor="password">Password:</label><br />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                  />
                  <i id="eye-icon" className="fas fa-eye-slash" onClick={togglePasswordVisibility}></i>
                </div>
                <input type="submit" value="Login" className="button" onClick={handleFormSubmit} /><br />
              </form>
              <div>
              <Link className="text-green-700 float-left" to="/forgot-password">Forgot Password?</Link>
              
              <Link className="text-green-700 float-right" to="/register">Register?</Link>
              
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal title="Account Verification" footer={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className='flex justify-center items-center'>

          <VerifyOtp email = {formData.email} closeModal={handleCancel}/>

        </div>
      </Modal>

    </>
  );
};

export default Login;
