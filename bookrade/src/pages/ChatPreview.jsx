import React from 'react'
import ChatBox from '../components/ChatBox'
import Navigation from "../components/navigation";
import ChatSideBar from '../components/ChatSideBar';
import "../css/chat.css"
import image from "../assets/images/select-user.png"


const ChatPreview = () => {
  
  return (
    <> 
    
    <Navigation />
    <div className='flex'>
        <ChatSideBar/>

        <div className=" overflow-x-auto profile-section mx-10 my-10 bg-white rounded-md ring-2 ring-gray-900/5 w-9/12 shadow flex flex-col items-center justify-center h-full text-gray-600" style={{height:"75vh"}}>
          <img src={image} alt='no data' className='w-2/5'></img>
          <p className='text-5xl text-black' style={{marginTop: '-30px'}}>Please select a user to start chatting.</p>
        </div>
    </div>
    </>
   
  )
}

export default ChatPreview