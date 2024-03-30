import React, { useEffect, useState } from "react";
import { sendGetRequest, sendDeleteRequest } from "../utils/api";
import { Modal } from 'antd';

const Users = () => {
    const [userModals, setUserModals] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false); // New state variable

    const getAllUsers = async () => {
        try {
            const response = await sendGetRequest('users');
            setUsers(response);
            // Initialize userModals state with false for each user
            setUserModals(Array(response.length).fill(false));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    const showModal = (index) => {
        const updatedModals = [...userModals];
        updatedModals[index] = true;
        setUserModals(updatedModals);
    };

    const handleOk = (index) => {
        const updatedModals = [...userModals];
        updatedModals[index] = false;
        setUserModals(updatedModals);
    };

    const handleCancel = (index) => {
        const updatedModals = [...userModals];
        updatedModals[index] = false;
        setUserModals(updatedModals);
    };

    const showDeleteModalForUser = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        try {
            const username = selectedUser.username
            await sendDeleteRequest(`delete_user/${username}`);
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

                        <span className="fas fa-edit text-3xl" onClick={() => showModal(index)}></span>
                        <span className="fas fa-trash text-3xl" onClick={() => showDeleteModalForUser(user)}></span>

                        <Modal title="Edit User Details" open={userModals[index]} onOk={() => handleOk(index)} onCancel={() => handleCancel(index)} okButtonProps={{ style: { backgroundColor: 'green' } }}>
                            <div className="profile-section">
                                <div className="profile-details" style={{ marginLeft: "50px" }}>
                                    <form>
                                        <label htmlFor="fname">First Name :</label>
                                        <input
                                            type="text"
                                            className="field"
                                            id="fname"
                                            name="first_name"
                                            defaultValue={user.first_name}
                                        />

                                        <label htmlFor="lname">Last Name :</label>
                                        <input
                                            type="text"
                                            className="field"
                                            id="lname"
                                            name="last_name"
                                            defaultValue={user.last_name}
                                        />

                                        <label htmlFor="username">Username :</label>
                                        <input
                                            type="text"
                                            className="field"
                                            id="username"
                                            name="username"
                                            defaultValue={user.username}
                                        />

                                        <label htmlFor="email">Email :</label>
                                        <input
                                            type="text"
                                            className="field"
                                            id="email"
                                            name="email"
                                            style={{ cursor: "not-allowed" }}
                                            defaultValue={user.email}
                                            readOnly
                                        />
                                    </form>
                                </div>
                            </div>
                        </Modal>

                        <Modal title="Delete User" open={showDeleteModal} onOk={handleDelete} onCancel={() => setShowDeleteModal(false)} okButtonProps={{ style: { backgroundColor: 'red' } }}>
                <p>Are you sure you want to delete this user?</p>
            </Modal>

                    </div>
                ))}
            </div>

            
        </>
    );
}

export default Users;
