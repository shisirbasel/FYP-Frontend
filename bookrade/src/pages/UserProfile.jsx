import React, { useEffect, useState } from 'react';
import Navigation from '../components/navigation';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { sendGetRequest, sendPatchRequest, sendPostRequest } from '../utils/api';
import Image from '../assets/images/usernotfound.png';
import BookCard from '../components/BookCard';
import { Modal } from 'antd';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const animatedComponents = makeAnimated();
  const navigate = useNavigate();
  let { username } = useParams();
  const [user, setUser] = useState({});
  const [avgRating, setAvgRating] = useState(null);
  const [books, setBooks] = useState({});
  const [reportTypes, setReportTypes] = useState({});
  const [rating, setRating] = useState(null);
  const [showRating, setShowRating] = useState(false);
  const [reportType, setReportType] = useState('');
  const [description, setDescription] = useState('')

  const getAvgRating = async () => {
    const response = await sendGetRequest(`avg_user_rating/${username}`);
    setAvgRating(response.rating);
  };

  const getRating = async () => {
    const response = await sendGetRequest(`get_user_rating/${username}`);
    setRating(response.rating);
  };

  const checkRequest = async () => {
    const response = await sendGetRequest(`check_request/${username}`)
    setShowRating(response.exists)
  }

  const updateUserRating = async () => {
    const showToast = false;
    const formData = new FormData();
    formData.append("rating", rating);
    try {
      const response = await sendPatchRequest(`update_user_rating/${username}`, formData, showToast); 
      console.log(response);
      getAvgRating();
    } catch (error) {
      console.error('Error updating user rating:', error);
    }
  };
  
  const rateUser = async () => {
    const formData = new FormData();
    formData.append("rating", rating);
    try {
      const response = await sendPostRequest(`rate_user/${username}`, formData);
      getAvgRating();
    } catch (error) {
      console.error('Error rating user:', error);
    }
  };
  
  const updateRating = async () => {
    rating ? updateUserRating() : rateUser();
  };

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
    const formData = new FormData();
    formData.append('type', reportType)
    formData.append('description', description)
    try{
      await sendPostRequest(`report_user/${user.id}`, formData);
      toast.success("User Reported Successfully.")
      setReportType('');  
      setDescription(''); 
    }
    catch (error){
      console.log(error)
    }
    setIsModalOpen(false)
  };

  const getUserBooks = async () => {
    try {
      const response = await sendGetRequest(`books/${username}`);
      setBooks(response);
    } catch (error) {
      console.error('Error fetching user books:', error);
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await sendGetRequest(`user/${username}`);
      setUser(response);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    getUserDetails();
    getUserBooks();
    getReportTypes();
    checkRequest();
    if (showRating){
      getAvgRating();
       getRating();
    }
  }, [showRating]);

  useEffect(() => {
    if (user && user.is_me) {
      navigate('/profile/details');
    }
  }, [user, showRating]);

  useEffect(() => {
    if (rating !== null) {
      updateRating();
    }
  }, [rating, showRating]);

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
                  onOk={reportUser}
                  onCancel={()=>setIsModalOpen(false)}
                  okText= "Report"
                  okButtonProps={{ style: { backgroundColor: 'red', width: "80px" }}}
                > 


                    <div className="profile-section">
                        <div className="profile-details" style={{ marginLeft: "50px" }}>
                            <form >
                                <label htmlFor="report">Report Type :</label>
                                <Select
                                    id="report"
                                    closeMenuOnSelect={true}
                                    components={animatedComponents}
                                    options={reportTypes}
                                    getOptionLabel={(option) => option.label}
                                    getOptionValue={(option) => option.value}
                                    className='select'
                                    onChange={(selectedOption) => {
                                      setReportType(selectedOption ? selectedOption.value : '');
                                    }}
                                    styles={{
                                        control: (provided, state) => ({
                                            ...provided,
                                            borderColor: state.isFocused ? 'green' : provided.borderColor,
                                            boxShadow: state.isFocused ? '0 0 0 1px #27ae60' : provided.boxShadow,
                                            width: '90%',
                                            marginBottom: '10px'
                                        }),
                                    }}
                                />

                                <label htmlFor="description" className='mt-5'>Description:</label>
                                <input
                                    type="text"
                                    className="field"
                                    id="description"
                                    name="description"
                                    onChange={(e)=>setDescription(e.target.value)}
                                />

                            </form>
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
               { avgRating? <> 
                    <Rating
                      name="size-large"
                      value={avgRating}
                      size="large"
                      readOnly
                    />
                  </>:
                  <>
                  <p className='text-2xl text-center font-medium'>Unrated</p>
                   
                  </> }
                 
                </Box>
              </div>
              <div className="text-center w-11/12 p-5 pl-16 flex flex-col gap-4">
                <h1 className="text-3xl text-black font-bold">{user.first_name} {user.last_name}</h1>
                <h1 className="text-3xl text-black font-medium">@{user.username}</h1>
                <h1 className="text-3xl text-black font-medium">14 Books</h1>
                <h1 className="text-xl text-black">175 Trades Completed</h1>
              </div>
              <div className="mt-3">
                <p className="text-2xl text-black font-bold">Favorite Genres: </p>
                <div className="flex flex-wrap gap-5 mt-5">
                  {user.genre && user.genre.map((genre, index) => (
                    <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 mt-2 text-lg font-semibold text-green-700">
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
              {showRating && (
                <div className="mt-10 flex flex-wrap gap-7">
                <p className="text-2xl text-black font-bold">Rate {user.first_name}: </p>

                <Box
                  sx={{
                    '& > legend': { mt: 2 },
                  }}
                > 
                   <Rating
                    name="size-large"
                    value={rating ? rating : 0}
                    size="large"
                    onChange={(e) => {
                      setRating(e.target.value);
                    }}
                  />

                </Box>
              </div>
              )}
              
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
