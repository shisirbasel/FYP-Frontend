import Sidebar from "../../components/Admin/SideBar"
import Reports from "../../components/Admin/Reports"
import AdminHeader from "../../components/Admin/AdminHeader"


const AdminReports = () => {
  return (
    <div className='admin-row-1'>
    <Sidebar/>
    <div className='w-11/12'>
      <AdminHeader/>
      <div className='m-5'>
          <Reports/>
      </div>

    </div> 
</div>
  )
}

export default AdminReports