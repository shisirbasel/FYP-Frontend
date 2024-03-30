

import Sidebar from '../components/SideBar'
import '../css/admin.css'
import MonthChart from '../components/MonthChart';
import BooksChart from '../components/BooksChart';
import DashboardDetails from '../components/DashboardDetails';
import AdminHeader from '../components/AdminHeader';

// import Header from '../components/header'

const Admin = () => {
  return (  
    <div className='flex flex-row'>
        <Sidebar/>
        <div className='flex flex-column w-11/12 bg-gray-100'>
          <AdminHeader/>
          <DashboardDetails/>
          <div className='content show-book-card flex gap-20 ml-40' style={{marginTop:"50px"}}>
            <MonthChart/>
            <BooksChart/>
          </div>
       
        </div> 
    </div>
  )
}

export default Admin