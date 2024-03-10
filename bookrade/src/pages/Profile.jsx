import "../css/profile.css";
import ProfileSidebar from "../components/ProfileSidebar";
import Navigation from "../components/navigation";
import UpdateProfile from "../components/UpdateProfile";

const Profile = () => {

  return (
    <div className="bg-gray-40 w-12/12">
      <Navigation/>

      <div className="flex flex-row">
        <ProfileSidebar/> 
        <UpdateProfile />
      </div>
      
     
    </div>
  );
};

export default Profile;