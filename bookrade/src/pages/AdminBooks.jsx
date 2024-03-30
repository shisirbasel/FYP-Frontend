import AdminHeader from '../components/AdminHeader'
import ShowBooks from '../components/ShowBooks'
import Sidebar from '../components/SideBar'
import '../css/admin.css'

const AdminBooks = () => {
    return (  
        <div className='admin-row-1'>
            <Sidebar/>
            
            <div className='w-11/12'>
            <AdminHeader/>
            <div className='content show-book-card '>
            <ShowBooks select={true} admin={true} ownbook={true}/>
            </div>
        
            </div> 
        </div>
    )
}

export default AdminBooks