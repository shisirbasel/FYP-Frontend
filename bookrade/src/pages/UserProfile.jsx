import React, { useEffect, useState } from 'react';
import Navigation from '../components/navigation';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { sendGetRequest, sendPostRequest } from '../utils/api';
import Image from '../assets/images/usernotfound.png';
import BookCard from '../components/BookCard';
import { Modal } from 'antd';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const UserProfile = () => {
  const animatedComponents = makeAnimated();
  const navigate = useNavigate();
  let {username} = useParams()
  const [user, setUser] = useState({});
  const [rating, setRating] = useState(0);
  const [books, setBooks] = useState({})
  const [reportTypes, setReportTypes] = useState({})

  const getReportTypes = async () => {
    try {
      const response = await sendGetRequest('report_types');
      const reportTypesArray = Object.keys(response.report_types).map(key => ({
        value: key,
        label: response.report_types[key]
      }));
      setReportTypes(reportTypesArray);
    } catch (error) {
      console.error('Error fetching report types:', error);
    }
  };
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const reportUser = async () => {
    const reponse = await sendPostRequest(`report`)
  }

  const getUserBooks = async () => {
    try {
      const response = await sendGetRequest(`books/${username}`);
      setBooks(response);
    } catch (error) {
      console.error('Error fetching user books:', error);
    }
  }
  
  const getUserDetails = async () => {
    try {
      const response = await sendGetRequest(`user/${username}`);
      setUser(response);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  }
  
  useEffect(() => {
    getUserDetails();
    getUserBooks();
    getReportTypes();
  }, []);
  
  useEffect(() => {
    if (user && user.is_me) {
      navigate('/profile/details');
    }
  }, [user]);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <Navigation />
      {user? (
        <>
          <div className="m-auto mt-8 bg-white rounded-md ring-2 ring-gray-900/5 w-11/12 p-8 flex gap-5 " style={{ height: '78vh' }}>
            <div className='details-section flex flex-col items-start w-3/12' style={{ height: '75vh' }}>
              <div className="flex justify-between w-full">
                <p className="text-3xl text-black font-medium">{user.first_name}'s Profile</p>
                <span className="text-5xl font-bold text-gray-500 cursor-pointer hover:pointer hover:text-black relative" style={{ marginTop: '-20px' }} onClick={toggleDropdown}>
                  ...
                  {dropdownOpen && (
                    <div className="dropdown-menu absolute bg-gray-500 text-white top-16 right-0 w-40 pb-4">
                      <Link className='p-5 pb-10 text-xl' onClick={()=>setIsModalOpen(true)}>Report User</Link>
                    </div>
                  )}
                </span>
                <Modal
                  title={`Report ${user.first_name}`}
                  open={isModalOpen}
                  onOk={()=>setIsModalOpen(false)}
                  onCancel={()=>setIsModalOpen(false)}
                  okText= "Report"
                  okButtonProps={{ style: { backgroundColor: 'red', width: "80px" }}}
                >
                  <div className='profile-section'>
                    <div className='profile-details'>
                      <label htmlFor="report_type.">Report Type:</label>
                                            <Select
                        id="report_type"
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        className="select"
                        options={reportTypes}
                        getOptionLabel={(option) => option.label}
                        getOptionValue={(option) => option.value}
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            borderColor: state.isFocused ? 'green' : provided.borderColor,
                            boxShadow: state.isFocused ? '0 0 0 1px #27ae60' : provided.boxShadow,
                            width: '90%'
                          }),
                        }}
                      />

                    </div>
                  </div>
                </Modal>
              </div>
              <div className="w-11/12 m-5 mt-8">
                <img src={`http://127.0.0.1:8000${user.profile_picture}`} alt="" className='rounded-full w-6/12 h-60 mx-auto mt-5' />
              </div>
              <div className="mx-auto text-3xl">
                <Box
                  sx={{
                    '& > legend': { mt: 2 },
                  }}
                >
                  <Rating
                    name="size-large"
                    value={5}
                    size="large"
                    readOnly
                  />
                </Box>
              </div>
              <div className="text-center w-11/12 p-5 pl-16 flex flex-col gap-8">
                <h1 className="text-3xl text-black font-bold">{user.first_name} {user.last_name}</h1>
                <h1 className="text-3xl text-black font-medium">@{user.username}</h1>
                <h1 className="text-3xl text-black font-medium">14 Books</h1>
                <h1 className="text-xl text-black">175 Trades Completed</h1>
              </div>
              <div className="mt-10">
                <p className="text-2xl text-black font-bold">Favorite Genres: </p>
                <div className="flex flex-wrap gap-5 mt-5">
                  {user.genre && user.genre.map((genre, index) => (
                    <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 mt-2 text-lg font-semibold text-green-700">
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className='books-section flex flex-wrap gap-20 overflow-x-auto w-9/12 p-10' style={{ height: '75vh' }}>
              {Array.isArray(books) && books.map((book, idx) => (
                <Link key={idx} className='book'>
                  <BookCard book={book} select={true} ownbook={false} getBookData={getUserBooks} />
                </Link>
              ))}
            </div>
          </div>
        </>
      ) :  (
        <>
          <img src={Image} alt="" className='w-5/12 mx-auto' />
          <h1 className='text-black text-5xl text-center items-center' style={{marginTop: "-50px"}}>User Couldnot be Found</h1>
        </>
      )}
    </>
  );
};

export default UserProfile;
