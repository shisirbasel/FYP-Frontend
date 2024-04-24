import axios from 'axios';
import { getToken } from './token';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logout } from '../state/authSlice';
import { store } from '../app/store';



const BASE_URL = "http://127.0.0.1:8000/api";
let counter = 0

export const sendPostRequest = async (endpoint, formDataToSend) => {

  try {
      const token = getToken();
      const response = await axios.post(`${BASE_URL}/${endpoint}/`, formDataToSend, {
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
          },
      });
      
      if (response.status === 201) {
          toast.success(response.data.message);
          counter = 0;
      }  
      
      return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
          try {
              await refreshToken();
              const newToken = getToken();
              const newResponse = await axios.post(`${BASE_URL}/${endpoint}/`, formDataToSend, {
                  headers: {
                      Authorization: `Bearer ${newToken}`,
                      'Content-Type': 'multipart/form-data',
                  },
              });
              
              toast.success(newResponse.data.message);
              return newResponse.data;
          } catch (error) {
            if (error.response.status === 401){
              store.dispatch(logout());
            }
          }
    }
    else if(error.response.status === 400){
      toast.error("Invalid or Empty Input! Please Try Again.")
      return error.response
    }
      else{
        toast.error("A Problem Occured, Please Try Again")
    }
  }
};


export const sendGetRequest= async(endpoint) => {
  try {
      const token = getToken();
      const response = await axios.get(`${BASE_URL}/${endpoint}`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      try {
          await refreshToken();
          const newToken = getToken();
          const newResponse = await axios.get(`${BASE_URL}/${endpoint}/`, {
              headers: {
                  Authorization: `Bearer ${newToken}`,
              },
          });
          counter = 0;
          console.log(response)
          return newResponse.data;
          
      } catch (error) {
        console.log("get error: ", error)
        if (error.response.status === 401){
          store.dispatch(logout())
        }
      }
  }
  else{
      console.log(error)
  }
     
  }
};

export const sendPatchRequest = async (endpoint, formDataToSend, showToast = true) => {
    try {
      const token = getToken();
      const response = await axios.patch(`${BASE_URL}/${endpoint}/`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      showToast?
      toast.success("Updated Successfully"):''
      counter = 0;
      console.log(response)
      return response;
    } catch (error) {
      console.log(error)
      if (error.response && error.response.status === 401) {
        try {
          await refreshToken();
          const newToken = getToken();
          const newResponse = await axios.patch(`${BASE_URL}/${endpoint}/`, formDataToSend, {
            headers: {
              Authorization: `Bearer ${newToken}`,
              'Content-Type': 'multipart/form-data',
            },
          });
  
          toast.success(newResponse.data.message);
          return newResponse.data;
        } catch (error) {
          if (error.response.status === 401){
            store.dispatch(logout());
          }
        }
      }
      else if(error.response && error.response.status === 400){
        toast.error(error.response.message);
        return error.response;
      }
      else{
        toast.error("Please Try Again Later");
        return error.response;
      }
       
    }
  };

  export const sendPatchRequestWithoutData = async (endpoint) => {
    try {
      const token = getToken();
      const response = await axios.patch(
        `${BASE_URL}/${endpoint}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      counter = 0;

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          await refreshToken();
          const newToken = getToken();
          const newResponse = await axios.patch(
            `${BASE_URL}/${endpoint}/`,
            {},
            {
              headers: {
                Authorization: `Bearer ${newToken}`,
                'Content-Type': 'multipart/form-data',
              },
            }
          );
  
          toast.success(newResponse.data.message);
          return newResponse.data;
        } catch (error) {
          store.dispatch(logout());
        }
      }
      toast.error("Please Try Again Later");
      return error.response;
    }
  };
  
  export const sendDeleteRequest = async (endpoint) => {
    try {
      const token = getToken();
      const response = await axios.delete(`${BASE_URL}/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
        toast.success(response.data);
        counter = 0;

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          await refreshToken();
          const newToken = getToken();
          const newResponse = await axios.delete(`${BASE_URL}/${endpoint}/`, {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          });
  
          toast.success(newResponse.data);
          return newResponse.data;
        } catch (error) {
          if (error.response.status === 401){
            store.dispatch(logout());
          }
        }
      }
      toast.error("Please Try Again Later");
      return error.response;
    }
  };


const refreshToken = async () => {
  try {
    const refresh = localStorage.getItem("refresh");
    const refreshData = { refresh };
    const response = await axios.post(`${BASE_URL}/token/refresh/`, refreshData);
    if (refresh && response.status === 200) {
      const { access } = response.data;
      localStorage.setItem("token", access);}
  } catch (error) {
    if( counter === 0){
    toast.error("Session Expired, Please Login Again");
    counter = 1 }
    store.dispatch(logout());
  }
};

