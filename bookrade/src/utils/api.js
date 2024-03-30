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
      
      if (response.status === 201) {
          toast.success(response.data.message);
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
              toast.error("Please Try Again Later");
          }
    }
    else if(error.response.status === 400){
      toast.error("Invalid or Empty Input! Please Try Again.")
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
          
          return newResponse.data;
      } catch (error) {
          toast.error("Failed to retry GET request after token refresh");
      }
  }
      toast.error("Please Try Again Later");
      return [];
  }
};

export const sendPatchRequest = async (endpoint, formDataToSend) => {
    try {
      const token = getToken();
      const response = await axios.patch(`${BASE_URL}/${endpoint}/`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success("Updated Successfully")
      return response.data;
    } catch (error) {
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
          toast.error("Please Try Again Later");
        }
      }
      toast.error("Please Try Again Later");
      return error.response;
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
          toast.error("Please Try Again Later");
        }
      }
      toast.error("Please Try Again Later");
      return error.response;
    }
  };
  
  export const sendDeleteRequest = async (endpoint) => {
    try {
      const token = getToken();
      const response = await axios.delete(`${BASE_URL}/${endpoint}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        toast.success(response.data);
      } else if (response.status === 401) {
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
          toast.error("Please Try Again Later");
        }
      }
  
      return response.data;
    } catch (error) {
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
      localStorage.setItem("token", access);
    } else {
      toast.error("Session Expired. Please login again.");
    }
  } catch (error) {
    toast.error("Please Login Again.");
  }
};

