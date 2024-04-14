import React, { useEffect, useState } from "react";
import { sendGetRequest, sendDeleteRequest , sendPatchRequest } from "../utils/api";
import { Modal } from 'antd';
import {  toast } from 'react-toastify';
import UpdateUser from "./UpdateUser";

const Users = () => {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
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

    const showUpdateModalForUser = (user) => {
        setSelectedUser(user);
        setShowUpdateModal(true);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const updatedUser = {
                id : selectedUser.id,
                first_name: event.target.first_name.value,
                last_name: event.target.last_name.value,
                username: event.target.username.value,
            };
            await sendPatchRequest(`update_profile`, updatedUser);
            getAllUsers();
            setShowUpdateModal(false);
        } catch (error) {
            toast.error("heloo")
            console.error(error);   
        }
    };
   
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
            <div className="overflow-x-auto mx-10 my-10 bg-white rounded-md ring-2 ring-gray-900/5 shadow pt-10 px-32" style={{ height: "85vh", width: '95%', marginTop: "-50px" }}>
                <h1 className='text-3xl font-semibold mb-10'>Users</h1>
                {users.map((user, index) => (
                    <div key={index} className="bg-white p-4 rounded-md shadow-sm mb-4 gap-10 flex ring-2 ring-gray-900/5 hover:bg-gray-200 items-center">

                        <img src={`http://127.0.0.1:8000${user.profile_picture}`} alt="" className="w-20 h-20 rounded-full"/>

                        <p className="w-4/12 text-xl font-semibold text-center">{user.first_name + " " + user.last_name}</p>

                        <p className="w-4/12 text-xl font-semibold text-center">{user.username}</p>

                        <p className="w-4/12 text-xl font-semibold text-center">{user.email}</p>

                        <span className="fas fa-edit text-3xl" onClick={() => showUpdateModalForUser(user)}></span>
                        <span className="fas fa-trash text-3xl" onClick={() => showDeleteModalForUser(user)}></span>
                        <Modal title="Edit User Details" open={showUpdateModal} onOk={handleUpdate} onCancel={() => setShowUpdateModal(false)} okButtonProps={{ style: { backgroundColor: 'green' } }}>
                                        
                        <UpdateUser selectedUser={user}/>
                        </Modal>
                    </div>
                ))}
            </div>

            

            <Modal title="Delete User" open={showDeleteModal} onOk={handleDelete} onCancel={() => setShowDeleteModal(false)} okButtonProps={{ style: { backgroundColor: 'red' } }}>
                <p>Are you sure you want to delete this user?</p>
            </Modal>
        </>
    );
}

export default Users;
