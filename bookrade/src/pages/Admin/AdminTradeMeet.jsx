import React from 'react'
import Sidebar from '../../components/Admin/SideBar'
import AdminHeader from '../../components/Admin/AdminHeader'
import TradeMeets from '../../components/Admin/TradeMeets'

const AdminTradeMeet = () => {
  return (
    <div className='admin-row-1'>
        <Sidebar/>
        <div className='w-11/12'>
            <AdminHeader/>
            <div className='m-5'>
                <TradeMeets/>
            </div>
        </div> 
    </div>
  )
}

export default AdminTradeMeet