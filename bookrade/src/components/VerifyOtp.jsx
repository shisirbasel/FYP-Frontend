import axios from 'axios';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import OtpInput from 'react-otp-input';
import { useState } from 'react';


const VerifyOtp = () => {

    const [otp, setOTP] = useState("");
    const formData = {"otp":otp}
    const BASE_URL = "http://127.0.0.1:8000/api/";
    const navigate = useNavigate();


    const submitForm = async (e) =>{
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}verify_account/`, formData, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
        
            console.log(response.data);
        
            if (response.status === 200) {   
              toast.success(
                "Account Verified"
              )
                navigate("/login")
            }
          } catch (error) {
            if (error.response) {
              if (error.response.status === 401 || error.response.status === 400) {
                toast.error("Invalid OTP");
              } else {
                toast.error("Error Occurred. Please Try Again Later.");
              }
            } else {
              toast.error("Error Occurred. Please Try Again Later.");
            }
          }

    }

  return (
    <>

         <div>
            <h2>Verify OTP</h2>
            <form >
                <label>
                Enter OTP:
                
                <OtpInput
      value={otp}
      onChange={setOTP}
      numInputs={4}
      renderSeparator={<span> </span>}
      renderInput={(props) => <input {...props} />}
    />
                </label>
                <button type="submit" onClick={submitForm}>Verify OTP</button>
            </form>
        </div>


        
    </>
  )
}

export default VerifyOtp