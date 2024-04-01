import React, { useCallback, useEffect, useState } from 'react';
import Navigation from "../components/navigation";
import ChatSideBar from '../components/ChatSideBar';
import { useParams } from 'react-router-dom';
import { sendGetRequest } from '../utils/api';
import image from "../assets/images/select-user.png"
import MessageBox from '../components/MessageBox';
import useGlobal from '../state/global'
import Messages from '../components/Messages';

const Chat = () => {
  const socketConnect = useGlobal(state => state.socketConnect);
  const socketClose = useGlobal(state => state.socketClose);

  useEffect(() => {
    socketConnect();
    return () => {
      socketClose();
    };
  }, []);


  const [user, setUser] = useState({});
  let { id } = useParams();

  const getUser = useCallback(async () => {
    try {
      const response = await sendGetRequest(`user/${id}`);
      setUser(response);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }, [id]);

  useEffect(() => {
    getUser();
  }, [id])


  return (
    <> 
      <Navigation />
      <div className='flex'>
        <ChatSideBar/>

        {user ? (
          <div className="profile-section mx-10 my-10 bg-white rounded-md ring-2 ring-gray-900/5 w-9/12 shadow flex flex-col h-full text-gray-600" style={{ height: "75vh" }}>
            <div className='bg-slate-50 flex gap-4 flex-row items-center p-4 ring-2 ring-gray-900/5 pl-100' style={{ width: '100%', height: '60px' }}>
              <img src={`http://127.0.0.1:8000${user.profile_picture}`} className='w-16 h-16 ml-4 rounded-full'/>
              <h1 className='text-2xl font-bold'>@{user.username}</h1> 
            </div>

            <div className='' style={{ height: '60vh' }}>
              <Messages user={user} />
            </div>

            <div className='' style={{ height: '8vh' }}>
              <MessageBox user={user} />
            </div>
          </div>
        ) : (
          <div className=" overflow-x-auto profile-section mx-10 my-10 bg-white rounded-md ring-2 ring-gray-900/5 w-9/12 shadow flex flex-col items-center justify-center h-full text-gray-600" style={{ height:"75vh" }}>
            <img src={image} alt='no data' className='w-2/5'></img>
            <p className='text-5xl text-black' style={{ marginTop: '-30px' }}>Please select a user to start chatting.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Chat;
