import "../../css/profile.css";
import ProfileSidebar from "../../components/User/ProfileSidebar";
import Navigation from "../../components/User/navigation";
import NewPasswordForm from '../../components/User/NewPasswordForm'

const ChangePassword = () => {

  return (
    <div className="bg-gray-40 w-12/12">
      <Navigation/>

      <div className="flex flex-row">
        <ProfileSidebar/> 
        <NewPasswordForm/>
      </div>
      
    </div>
  );
};

export default ChangePassword;