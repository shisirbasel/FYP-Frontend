const MyMessageBubble = ({ message }) => {
    return (
      <div className="flex justify-end">
        <div className="max-w-3/4 bg-green-600 text-white text-2xl px-6 py-3 rounded-lg mt-4 mx-10" style={{maxWidth:'75%'}}>
          {message.text}
        </div>
      </div>
    );
  };
  
  const FriendMessageBubble = ({ message, user }) => {
    return (
      <div className="flex justify-start">
        <img src={`http://127.0.0.1:8000${user.profile_picture}`} className='w-12 h-12 ml-6 mt-5 rounded-full'/>
        <div className="max-w-3/4 bg-gray-200 text-black text-2xl px-6 py-3 rounded-lg mt-4 ml-3 mr-10" style={{maxWidth:'75%'}}>
          {message.text}
        </div>
      </div>
    );
  };
  
  export { MyMessageBubble, FriendMessageBubble };
  