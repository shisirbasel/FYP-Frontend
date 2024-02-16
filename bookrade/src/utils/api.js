import axios from 'axios';
import { getToken } from './token';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = "http://127.0.0.1:8000/api";

export const sendPostRequest = async (endpoint, formDataToSend) => {
    try {
      const token = getToken();
      const response = await axios.post(`${BASE_URL}/${endpoint}/`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data)
      
      if (response.data.status===201){
        toast.success(response.data.message)
      }
      else{
        toast.error(response.data.message)
      }
      return response.data;

    } catch (error) {
      toast.error("Please Try Again Later")
      return error.response ;
    }
};
  
