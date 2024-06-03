import { useState } from 'react';
import { sendPatchRequest } from '../../utils/api';
import { toast } from 'react-toastify';

const NewPasswordForm = () => {

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const togglePasswordVisibility = () => {

    var old_password = document.getElementById("oldpassword");
    var password_1 = document.getElementById("password1");
    var password_2 = document.getElementById("password2");

    if (password_1.type === "password") {
      old_password.type = "text";
      password_1.type = "text";
      password_2.type = "text";
    } else {
      old_password.type = "password";
      password_1.type = "password";
      password_2.type = "password";
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();

    if (oldPassword === '') {
      toast.error("Please Provide Your Old Password.");
      return;
    }
    else if (newPassword === '' | confirmPassword === '') {
      toast.error("Password Cannot Be Empty");
      return;
    }
    else if (newPassword !== confirmPassword) {
      toast.error("Passwords don't Match.");
      return;
    }
      const formData = new FormData();
      formData.append("old_password", oldPassword);
      formData.append("new_password", newPassword);
      const response = await sendPatchRequest('update_password', formData, false);
      console.log(response)
      if(response.status === 200) {
        toast.success(response.data)
      }
      else{
        toast.error(response.data)
      }
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    
  }

  return (
    <div className="overflow-auto profile-section mx-10 my-10 bg-white rounded-md ring-2 ring-gray-900/5 w-9/12 shadow pt-10">
      <div className="profile-details">
        <form>
          <label htmlFor="oldpassword">Old Password :</label>
          <input
            type="password"
            className="field"
            id="oldpassword"
            name="oldpassword"
            value={oldPassword}
            onChange={(e)=>setOldPassword(e.target.value)}
          />

          <label htmlFor="password1">New Password :</label>
          <input
            type="password"
            className="field"
            id="password1"
            name="password1"
            value={newPassword}
            onChange={(e)=>setNewPassword(e.target.value)}
          />

          <label htmlFor="password2">Confirm New Password :</label>
          <input
            type="password"
            className="field"
            id="password2"
            name="password2"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
          />

          <div style={{ display: 'inline-flex', alignItems: 'center', marginTop: '10px' }}>
            <input 
              type="checkbox" 
              id="myCheckbox" 
              style={{ width: '16px', height: '16px', marginRight: '8px', verticalAlign: 'middle', cursor: 'pointer' }}
              onClick={togglePasswordVisibility} 
            />
            <label htmlFor="myCheckbox" style={{ cursor: 'pointer', marginTop: "-12px"}}>Show Password</label>
          </div>

          <button className="mt-10 mb-24 mr-36 success-btn float-right"
          onClick={changePassword}>
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewPasswordForm;
