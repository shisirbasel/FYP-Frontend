import Sidebar from '../../components/Admin/SideBar'
import AdminHeader from '../../components/Admin/AdminHeader'
import Users from '../../components/Admin/Users'

const AdminUsers = () => {
  return (
    <div className='admin-row-1'>
    <Sidebar/>
    
    <div className='w-11/12'>
    <AdminHeader/>
    <div className='m-5'>
        <Users/>
    </div>

    </div> 
</div>
  )
}

export default AdminUsers