import AdminHeader from '../../components/Admin/AdminHeader'
import Books from '../../components/Shared/Books'
import Sidebar from '../../components/Admin/SideBar'
import '../../css/admin.css'

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