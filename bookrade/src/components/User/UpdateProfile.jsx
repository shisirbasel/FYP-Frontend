import { useCallback, useEffect, useState } from "react";
import { sendGetRequest } from "../../utils/api";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import '../../css/successbutton.css';
import { getToken } from "../../utils/token";
import {  toast } from 'react-toastify';
import axios from 'axios';

const UpdateProfile = () => {

  const BASE_URL = "http://127.0.0.1:8000/api/";

  const animatedComponents = makeAnimated();
  const [genres, setGenres] = useState([]);
  const [userGenre, setUserGenre] = useState([]);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

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
    setFirstName(response.first_name)
    setEmail(response.email)
    setLastName(response.last_name)
    setUsername(response.username)
    const formattedGenres = await GetGenres();
    const selectedGenres = response.genre.map(genreId => ({
      label: formattedGenres.find(formattedGenre => formattedGenre.value === genreId).label,
      value: genreId
    }));
    setUserGenre(selectedGenres);
  };

  const handleGenreChange = (selectedOptions) => {
    setUserGenre(selectedOptions); 
  };

  const getUserDetails = useCallback(() => {
    UserDetails();
  }, []);

  useEffect(() => {
    getUserDetails();
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
    console.log(firstName)
    console.log(lastName)
    console.log(username)

    if (firstName === ''){
      toast.error("First Name Cannot Be Empty");
      return;
    }
    if (lastName === ''){
      toast.error("Last Name Cannot Be Empty");
      return;
    }
    if (username === ''){
      toast.error("Username Cannot Be Empty");
      return;
    }

    const requestData = {
      first_name: firstName,
      last_name: lastName,
      username: username,
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
      getUserDetails();
    } catch(error) {
          if (error.response && error.response.status === 401) {
            try {
              await refreshToken();
              const newToken = getToken();
              await axios.patch(`${BASE_URL}update_profile/`, requestData, {
                headers: {
                  Authorization: `Bearer ${newToken}`,
                  'Content-Type': 'application/json',
                },
              });
              toast.success("Profile Updated Successfully");
              return newResponse.data;
            } catch (error) {
              toast.error("Please Try Again Later");
            }
      }
      else if(error.response && error.response.status === 400) {
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
                    value={firstName}
                    onChange={(e)=>setFirstName(e.target.value)}
                  />

                    <label htmlFor="lname">Last Name :</label>
                    <input
                      type="text"
                      className="field"
                      id="lname"
                      name="last_name"
                      value={lastName}
                      onChange={(e)=>setLastName(e.target.value)}
                    />

                    <label htmlFor="username">Username :</label>
                    <input
                      type="text"
                      className="field"
                      id="username"
                      name="username"
                      value={username}
                      onChange={(e)=>setUsername(e.target.value)}
                    />

                    <label htmlFor="email">Email :</label>
                    <input
                    type="text"
                    className="field"
                    id="email"
                    name="email"
                    style={{ cursor: "not-allowed" }}
                    defaultValue={email}
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
