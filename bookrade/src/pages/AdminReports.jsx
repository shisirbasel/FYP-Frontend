import Sidebar from "../components/SideBar"
import Reports from "../components/Reports"
import AdminHeader from "../components/AdminHeader"


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