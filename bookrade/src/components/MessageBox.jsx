import React, { useState } from "react";
import useGlobal from "../state/global";

const MessageBox = ({user}) => {

    const [message, setMessage] = useState('');

    const messageSend = useGlobal(state => state.messageSend)

    const handleSendMessage = (e) => {
        e.preventDefault();
        const cleaned = message.replace(/\s+/g, ' ').trim()
        if (cleaned.length === 0) return
        messageSend(user.id, cleaned,)
        setMessage('')
    };
    
    return (
        <div className='flex' style={{ height: '8vh' }}>
            <textarea 
                className='border border-gray-300 rounded-lg h-12/12 p-2 px-5 mr-2 w-11/12 text-2xl' 
                placeholder='Type your message...' 
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
                style={{ height: '8vh' }}
            />
            <button 
                className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' 
                onClick={handleSendMessage} 
                style={{ width: '100px' }}
            >
                Send
            </button>
        </div>
    );
};

export default MessageBox;
