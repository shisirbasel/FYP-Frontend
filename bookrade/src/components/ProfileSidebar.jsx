import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { sendGetRequest, sendPatchRequest } from '../utils/api';
import { useDispatch } from 'react-redux';
import { logout } from '../state/authSlice';

const ProfileSidebar = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});

  const changeProfilePicture = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('profile_picture', file);
    const response = await sendPatchRequest("profile_picture", formData)
    getUserDetails()
  }

  const getUserDetails = async () => {
    const response = await sendGetRequest('profile');
    setUserData(response);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div className="profile-sidebar mx-10 my-10 bg-white rounded-md ring-2 ring-gray-900/5 w-3/12 shadow pt-10" style={{ height: '75vh' }}>
      <div className="profile-picture relative flex flex-row items-center">
        <div className="w-4/12 ml-20">

          <input 
            type='file' 
            id='profilepicture' 
            className='hidden' 
            accept='image/jpeg,image/jpg,image/png'
            onChange={changeProfilePicture}/>

          <img src={`http://127.0.0.1:8000${userData.profile_picture}`} className="h-40 w-40 rounded-full" alt="Profile" />
          <button className="absolute top-0 bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-white text-2xl" onClick={(e)=> {
            e.preventDefault()
            document.getElementById('profilepicture').click()
          }}>
            +
          </button>
        </div>
        <div>
          <p className="text-2xl font-bold text-black">
            {userData.first_name} {userData.last_name}
          </p>
          <p className="text-xl text-gray-500">@ {userData.username}</p>
        </div>
      </div>

      <div className="profile-links items-center mt-10">
        <Link to="/profile/details" className="rounded-md block m-5 bg-gray-100 pl-10 px-15 py-5 text-2xl text-black-900 hover:bg-gray-300">
          <i className="fas fa-user m-3 mr-5" />Profile
        </Link>
        <Link to="/profile/books" className="rounded-md block m-5 bg-gray-100 pl-10 px-15 py-5 text-2xl text-black-900 hover:bg-gray-300">
          <i className="fas fa-book m-3 mr-5" />Your Books
        </Link>
        <Link to="#" className="rounded-md block m-5 bg-gray-100 pl-10 px-15 py-5 text-2xl text-black-900 hover:bg-gray-300">
          <i className="fas fa-key m-3 mr-5" />Change Password
        </Link>
        <Link to="#" className="rounded-md block m-5 bg-gray-100 pl-10 px-15 py-5 text-2xl text-black-900 hover:bg-gray-300">
          <i className="fas fa-handshake m-3 mr-5" />Trade Requests
        </Link>
        <Link to="#" onClick={handleLogout} className="rounded-md block m-5 mt-44 bg-gray-300 pl-10 px-15 py-5 text-2xl text-black-900 hover:bg-gray-500  hover:text-white">
          <i className="fas fa-sign-out m-3 mr-5" />Logout
        </Link>
      </div>
    </div>
  );
};

export default ProfileSidebar;
