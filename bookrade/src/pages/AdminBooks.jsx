import AdminHeader from '../components/AdminHeader'
import Books from '../components/Books'
import ShowBooks from '../components/ShowBooks'
import Sidebar from '../components/SideBar'
import '../css/admin.css'

const AdminBooks = () => {
    return (  
        <div className='admin-row-1'>
            <Sidebar/>
            
            <div className='w-11/12'>
            <AdminHeader/>
            <div className='m-5'>
            <Books select={true} admin={true} ownbook={true}/>
            </div>
        
            </div> 
        </div>
    )
}

export default AdminBooks