import { Link } from "react-router-dom";
import logo from "../assets/logos/logo-white.png";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === ""){
      toast.error("Email Shouldn't Be Empty.")
      return
    }
    try {
      const data = {
        "email": email
      };
      const response = await axios.post("http://127.0.0.1:8000/api/send_reset_password_email/", data);
      console.log(response);
      toast.success(response.data)
    } catch (error) {
      error.response.status === 400?
            error.response.data.non_field_errors?
            toast.error(error.response.data.non_field_errors[0]) : toast.error("Please Enter a valid email.")
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
        <div className="rounded-md profile-details shadow-lg ring-2 ring-gray-900/5 w-5/12 h-96 p-10 pt-0 bg-white" style={{ width: '50%', marginLeft: '-10px' }}>
          <h1 className="text-2xl font-semibold" style={{marginTop:"10px"}}>Forget Password</h1>
          <form className="">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              className="field"
              id="email"
              name="email"
              style={{width: '100%'}}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex justify-between mt-4">
              <Link to='/login' className="text-2xl text-black hover:underline hover:text-green-700">Login?</Link>
              <button className="success-btn" style={{ width: '100px' }} onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
