import React, { useEffect, useState } from "react";
import { sendGetRequest, sendDeleteRequest, sendPatchRequest } from "../utils/api";
import { Modal } from 'antd';
import { toast } from 'react-toastify';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const getAllUsers = async () => {
        try {
            const response = await sendGetRequest('users');
            setUsers(response);
        } catch (error) { 
            console.error(error);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    const showDeleteModalForUser = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        try {
            await sendDeleteRequest(`delete_user/${selectedUser.username}`);
            getAllUsers();
            setShowDeleteModal(false);
            setSelectedUser(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>

            <h1 className='text-3xl font-semibold mx-10 mb-10'>Users</h1>
            <div className="space-y-6 flex flex-col mx-10">
                {users.map((user, index) => (
                    <li key={index} className="bg-white p-4 px-7 rounded-md shadow-sm mb-4 gap-10 flex ring-2 ring-gray-900/5 hover:bg-gray-200 items-center w-12/12 ">
                        <img src={`http://127.0.0.1:8000${user.profile_picture}`} alt="" className="w-20 h-20 rounded-full" />
                        <p className="w-4/12 text-xl font-semibold text-center">{user.first_name + " " + user.last_name}</p>
                        <p className="w-4/12 text-xl font-semibold text-center">{user.username}</p>
                        <p className="w-4/12 text-xl font-semibold text-center">{user.email}</p>
                        <span className="fas fa-trash text-3xl" onClick={() => showDeleteModalForUser(user)}></span>
                    </li>
                ))}
            </div>

            <Modal title="Delete User" open={showDeleteModal} onOk={handleDelete} onCancel={() => setShowDeleteModal(false)} okButtonProps={{ style: { backgroundColor: 'red' } }}>
                <p>Are you sure you want to delete this user?</p>
            </Modal>
        </>
    );
}

export default Users;
