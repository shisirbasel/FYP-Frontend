import Sidebar from "../components/SideBar"
import AdminHeader from "../components/AdminHeader"
import AdminTradeReqs from "../components/AdminTradeReqs"

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