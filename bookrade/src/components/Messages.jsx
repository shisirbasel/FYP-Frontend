import React, { useRef, useEffect } from 'react';
import useGlobal from '../state/global';
import { MyMessageBubble, FriendMessageBubble } from './MessageBubbles';

const MessageBubble = ({ message }) => {
  return message.is_me ? (
    <MyMessageBubble message={message} />
  ) : (
    <FriendMessageBubble message={message} />
  );
};


const Messages = ({ user }) => {
  const socketConnect = useGlobal(state => state.socketConnect);
  const socketClose = useGlobal(state => state.socketClose);
  const messageList = useGlobal(state => state.messageList);
  const messagesList = useGlobal(state => state.messagesList);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    socketConnect();
    
    return () => {
      socketClose();
    };
  }, []);

  useEffect(() => {
    if (user) {
      messageList(user.id);
    }
  }, [user]); 


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messagesList]);

  return (
    <div className='overflow-x-auto pb-10' style={{ height: '60vh' }}>
      <ul>
        {messagesList.map((message, index) => (
          <li key={index}>
            <MessageBubble message={message}/>
          </li>
        ))}
        <div ref={messagesEndRef} />
      </ul>
    </div>
  );
}

export default Messages;
