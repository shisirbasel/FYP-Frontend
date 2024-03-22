import "../css/profile.css";
import ProfileSidebar from "../components/ProfileSidebar";
import Navigation from "../components/navigation";
import YourBooks from "../components/YourBooks";

const ProfileBooks = () => {

  const closeModal = null;

  return (
    <div className="bg-gray-40 w-12/12">
      <Navigation/>

      <div className="flex flex-row">
        <ProfileSidebar/>
        <YourBooks closeModal/>
      </div>
      
     
    </div>
  );
};

export default ProfileBooks;