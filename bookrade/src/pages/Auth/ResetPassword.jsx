import { Link, useParams, useNavigate} from "react-router-dom";
import logo from "../../assets/logos/logo-white.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ResetPassword = () => {
    const isLoggedIn = useSelector((state)=>state.auth.isLogin)
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (isLoggedIn) {
    //         navigate('/')
    //     }
    // })
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const togglePasswordVisibility = () => {
        var password_1 = document.getElementById("password");
        var password_2 = document.getElementById("password2");
    
        if (password_1.type === "password") {
          password_1.type = "text";
          password_2.type = "text";
        } else {
          password_1.type = "password";
          password_2.type = "password";
        }
      };

    const {uid, token} = useParams();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password === '' | password2 === '') {
            toast.error("Password Cannot Be Empty");
            return;
          }
        else if (password !== password2) {
            toast.error("Passwords don't Match.");
            return;
          }

        try {
          const data = {
            "password": password,
            "password2":password2
          };
          const response = await axios.post(`http://127.0.0.1:8000/api/reset_password/${uid}/${token}/`, data);
          console.log(response);
          toast.success("Password Reset Successful.")
          navigate('/login')
        } catch (error) {
            error.response.status === 400?
            toast.error(error.response.data.non_field_errors[0])
            :
            toast.error("Please Try Again Later.")
        }
      };

  return (
    <>
      <Link to="/" className="logo flex text-center justify-center items-center">
        <img src={logo} className='h-32 pr-3' style={{marginLeft: '-50px'}}/> 
        <p style={{marginLeft:'-25px'}} className="text-4xl font-bold">Bookrade</p>
      </Link>

      <div className="flex profile-section items-center justify-center pt-20">
        <div className="rounded-md profile-details shadow-lg ring-2 ring-gray-900/5 w-5/12 h-auto p-10 pt-0 bg-white" style={{ width: '50%', marginLeft: '-10px' }}>
          <h1 className="text-2xl font-semibold" style={{marginTop:"10px"}}>Reset Password</h1>
          <form className="">
            <label htmlFor="password">Password :</label>
                <input
                type="password"
                className="field"
                id="password"
                name="password"
                style={{width: '100%'}}
                onChange={(e) => setPassword(e.target.value)}
                />

            <label htmlFor="password2">Confirm Password :</label>
                <input
                type="password"
                className="field"
                id="password2"
                name="password2"
                style={{width: '100%'}}
                onChange={(e) => setPassword2(e.target.value)}
                />      
            <div className="flex justify-between mt-4">
            <div style={{ display: 'inline-flex', alignItems: 'center', marginTop: '10px' }}>
            <input 
              type="checkbox" 
              id="myCheckbox" 
              style={{ width: '16px', height: '16px', marginRight: '8px', verticalAlign: 'middle', cursor: 'pointer' }}
              onClick={togglePasswordVisibility} 
            />
            <label htmlFor="myCheckbox" style={{ cursor: 'pointer', marginTop: "-12px"}}>Show Password</label>
          </div>
              <button className="success-btn" style={{ width: '100px' }} onClick={handleSubmit}>
                Submit
              </button>

            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ResetPassword