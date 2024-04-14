import { useCallback, useEffect, useState } from "react";
import { sendGetRequest, sendPatchRequest } from "../utils/api";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import '../css/successbutton.css';
import { getToken } from "../utils/token";
import {  toast } from 'react-toastify';
import axios from 'axios';

const UpdateProfile = () => {

  const BASE_URL = "http://127.0.0.1:8000/api/";

  const animatedComponents = makeAnimated();
  const [userData, setUserData] = useState({});
  const [genres, setGenres] = useState([]);
  const [userGenre, setUserGenre] = useState([]);

  const GetGenres = async () => {
    try {
      const response = await sendGetRequest('genres');
      const formattedGenres = response.map(genre => ({ label: genre.name, value: genre.id }));
      setGenres(formattedGenres);
      return formattedGenres;
    } catch (error) {
      console.error('Error fetching genres:', error);
      return [];
    }
  };

  const UserDetails = async () => {
    const response = await sendGetRequest('profile');
    setUserData(response);
    const formattedGenres = await GetGenres();
    const selectedGenres = response.genre.map(genreId => ({
      label: formattedGenres.find(formattedGenre => formattedGenre.value === genreId).label,
      value: genreId
    }));
    setUserGenre(selectedGenres);
  };

  const handleGenreChange = (selectedOptions) => {
    setUserGenre(selectedOptions); 
    setUserData(prevUserData => ({
      ...prevUserData,
      genre: selectedOptions.map(option => ({ id: option.value }))
    }));
  };

  const getUserDetails = useCallback(() => {
    UserDetails();
  }, []);

  useEffect(() => {
    getUserDetails();
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
    
    const requestData = {
      first_name: userData.first_name,
      last_name: userData.last_name,
      username: userData.username,
      genre: userGenre.map(genre => genre.value),
    };
    
    const token = getToken();
    
    try {
      const response = await axios.patch(`${BASE_URL}update_profile/`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      toast.success("Profile Updated Successfully.");
      // Refresh user details after successful update
      getUserDetails();
    } catch(error) {
      if(error.response && error.response.status === 400) {
        let errorMessage = '';
        for (const field in error.response.data) {
          if (Array.isArray(error.response.data[field])) {
            errorMessage = error.response.data[field][0];
            break; 
          }
        }
        toast.error(errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1));
      } else {
        toast.error("A Problem Occurred, Please Try Again");
      }
    }
  };

  return (
    <>
      <div className="overflow-auto profile-section mx-10 my-10 bg-white rounded-md ring-2 ring-gray-900/5 w-9/12 shadow pt-10" style={{height:'75vh'}}>
        <div className="profile-details">
          <form>
          <label htmlFor="fname">First Name :</label>
                    <input
                    type="text"
                    className="field"
                    id="fname"
                    name="first_name"
                    defaultValue={userData.first_name}
                    onChange={(e)=>setUserData({ ...userData, first_name: e.target.value })}
                    />

                    <label htmlFor="lname">Last Name :</label>
                    <input
                    type="text"
                    className="field"
                    id="lname"
                    name="last_name"
                    defaultValue={userData.last_name}
                    onChange={(e)=>setUserData({ ...userData, last_name: e.target.value })}
                    />

                    <label htmlFor="username">Username :</label>
                    <input
                    type="text"
                    className="field"
                    id="username"
                    name="username"
                    defaultValue={userData.username}
                    onChange={(e)=>setUserData({ ...userData, username: e.target.value })}
                    />

                    <label htmlFor="email">Email :</label>
                    <input
                    type="text"
                    className="field"
                    id="email"
                    name="email"
                    style={{ cursor: "not-allowed" }}
                    defaultValue={userData.email}
                    readOnly
                    /> 
            <label htmlFor="genre">Genres :</label>
            <Select
              id="genre"
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={genres}
              className="select"
              value={userGenre} 
              onChange={handleGenreChange} 
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  borderColor: state.isFocused ? 'green' : provided.borderColor,
                  boxShadow: state.isFocused ? '0 0 0 1px #27ae60' : provided.boxShadow,
                  width: '90%'
                }),
              }}
            />
            <button onClick={updateProfile} className="mt-10 mb-24 mr-36 success-btn float-right">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default UpdateProfile;
