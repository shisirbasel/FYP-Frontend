import ShowBooks from '../components/ShowBooks'
import Sidebar from '../components/SideBar'
import '../css/admin.css'
// import Header from '../components/header'

const Admin = () => {
  return (  
    <div className='admin-row-1'>
        <Sidebar/>
        
        <div className='content show-book-card'>
          <ShowBooks/>
        </div> 
    </div>
  )
}

export default Admin