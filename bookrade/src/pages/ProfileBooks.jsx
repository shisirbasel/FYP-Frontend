import "../css/profile.css";
import ProfileSidebar from "../components/ProfileSidebar";
import Navigation from "../components/navigation";
import ShowBooks from "../components/ShowBooks";

const ProfileBooks = () => {

  return (
    <div className="bg-gray-40 w-12/12">
      <Navigation/>

      <div className="flex flex-row">
        <ProfileSidebar/>
        <div className="overflow-auto profile-section mx-10 my-10 bg-white rounded-md ring-2 ring-gray-900/5 w-9/12 shadow pt-10" style={{height:'75vh'}}><ShowBooks/></div>
      </div>
      
     
    </div>
  );
};

export default ProfileBooks;