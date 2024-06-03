import { useState, useEffect } from "react";
import { sendGetRequest } from "../../utils/api";
import { Link } from "react-router-dom";

const ChatSideBar = () => {

    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getConnectedUsers();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    const getConnectedUsers = async () => {
        try {
            const query = searchQuery !== '' ? `get_connected_users/?search=${searchQuery}` : 'get_connected_users';
            const response = await sendGetRequest(query);
            setUsers(response);
        } catch (error) {
            console.error('Error fetching connected users:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="mx-10 mt-10 bg-white rounded-md ring-2 ring-gray-900/5 w-3/12 shadow justify-center" style={{ height: '75vh' }}>
            <div className="bg-white ring-2 ring-gray-900/5 pb-5 search-user">
                <h1 className="text-2xl text-black font-semibold px-10 py-4">Messages</h1>
                <input
                    placeholder='Search User'
                    className="user-search mx-10"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <span className="fas fa-search text-3xl" />
            </div>

            <div className="overflow-auto" style={{ height: "63.5vh" }}>
            {users.map((user, index) => (
                <Link key={index} 
                className="rounded-md flex gap-10 m-5 bg-gray-100 pl-10 px-15 py-3 text-2xl text-black-900 w-11/12 hover:bg-gray-300"
                to={`/chat/${user.id}`}>
                    <div>
                        <img 
                        src={`http://127.0.0.1:8000${user.profile_picture}`} 
                        className="w-20 h-20 rounded-full"
                         />

                    </div>
                    <div className="mt-3 user-details hidden xl:w-auto xl:block">
                            <p className="text-black font-semibold text-xl">@{user.username}</p>
                            <p className="text-gray-500 font-semibold text-lg">{user.first_name} {user.last_name}</p>
                    </div>
                </Link>
            ))}
        </div>

        </div>
    );
};

export default ChatSideBar;
