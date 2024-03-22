import { useCallback, useEffect, useState } from "react";
import { sendGetRequest, sendPatchRequest } from "../utils/api";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import '../css/successbutton.css';

const UpdateProfile = () => {
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
    const formData = new FormData();
    formData.append('first_name', userData.first_name);
    formData.append('last_name', userData.last_name);
    formData.append('username', userData.username);
    
    if (userGenre.length > 0) {
      userGenre.forEach(genre => {
        formData.append('genre', genre.value);
        console.log(formData);
      });
    } else {
      // Clear existing genre data before appending empty list
      formData.delete('genre');
      formData.append('genre', JSON.stringify([]));
      console.log(formData);
    }
    
    const response = await sendPatchRequest('update_profile', formData);
    console.log(formData)
    console.log(response);
    getUserDetails();
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
