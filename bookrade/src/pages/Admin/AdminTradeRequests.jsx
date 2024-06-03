import Sidebar from "../../components/Admin/SideBar"
import AdminHeader from "../../components/Admin/AdminHeader"
import AdminTradeReqs from "../../components/Admin/AdminTradeReqs"

const AdminTradeRequests = () => {
  return (
    <div className='admin-row-1'>
    <Sidebar/>
    <div className='w-11/12'>
        <AdminHeader/>
        <div className='m-5'>
            <AdminTradeReqs/>
        </div>
    </div> 
</div>
  )
}

export default AdminTradeRequests