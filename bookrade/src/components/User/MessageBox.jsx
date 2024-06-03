import React, { useState } from "react";
import useGlobal from "../../state/global";

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
        <form>
            <div className='flex items-center justify-center ring-2 ring-gray-900/5 gap-5' style={{height: '7.1vh'}}>
                <input 
                    className='ml-1 message-input border border-gray-300 rounded-lg h-12/12 p-2 px-5 w-10/12 text-2xl' 
                    placeholder='Type your message...' 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ height: '5vh' }}
                />
                <button
                    type="submit"
                    className='bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-4 text-2xl rounded mr-1' 
                    onClick={handleSendMessage} 
                    style={{ width: '90px' , height: '5vh'}}
                >
                    Send <span className="fas fa-paper-plane"/>
                </button>
            </div>
        </form>
        

    );
};

export default MessageBox;
