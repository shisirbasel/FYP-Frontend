import React from 'react'

const UpdateUser = ({selectedUser}) => {
  return (
    <div className="profile-section">
                    <div className="profile-details" style={{ marginLeft: "50px" }}>
                        <form>
                            <label htmlFor="fname">First Name :</label>
                            <input
                                type="text"
                                className="field"
                                id="fname"
                                name="first_name"
                                defaultValue={selectedUser?.first_name}
                            />

                            <label htmlFor="lname">Last Name :</label>
                            <input
                                type="text"
                                className="field"
                                id="lname"
                                name="last_name"
                                defaultValue={selectedUser?.last_name}
                            />

                            <label htmlFor="username">Username :</label>
                            <input
                                type="text"
                                className="field"
                                id="username"
                                name="username"
                                defaultValue={selectedUser?.username}
                            />

                            <label htmlFor="email">Email :</label>
                            <input
                                type="text"
                                className="field"
                                id="email"
                                name="email"
                                style={{ cursor: "not-allowed" }}
                                defaultValue={selectedUser?.email}
                                readOnly
                            />
                           
                        </form>
                    </div>
                </div>
  )
}

export default UpdateUser