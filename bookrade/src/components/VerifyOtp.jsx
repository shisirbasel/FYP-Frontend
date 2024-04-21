import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { InputOTP } from 'antd-input-otp';
import { Form } from 'antd';
import { useState } from 'react';

const VerifyOtp = ({email, closeModal}) => {
    const [otp, setOTP] = useState('');
    const [concatenatedOTP, setConcatenatedOTP] = useState('')

    const handleOtpChange = (value) => {
        const concatenatedOTP = value.join('');
        setConcatenatedOTP(concatenatedOTP);
        setOTP(value); 
    };
    const formData = {"email": email, "otp": Number(concatenatedOTP)}
    const BASE_URL = "http://127.0.0.1:8000/api/";
    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const response = await axios.post(`${BASE_URL}verify_account/`, formData);

            if (response.status === 200) {
                toast.success("Account Verified");
                closeModal();
                navigate("/login");
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
    };

    return (
        <div className="w-full max-w-md p-8 bg-white rounded-lg items-center justify-center">
            <center><label className='text-3xl text-bold text-black'>Verify the OTP</label></center>
            <Form.Item name="otp">
                <div className='mx-15 my-10'>
                <InputOTP
                        name="otp"
                        value={otp}
                        autoFocus
                        onChange={handleOtpChange}
                        length={4}
                        inputType='numeric'
                    />
                </div>
            </Form.Item>
            <button className="w-full mt-4 py-2 px-4 rounded-md success-btn" onClick={submitForm}>Submit</button>
        </div>
    );
}

export default VerifyOtp;
