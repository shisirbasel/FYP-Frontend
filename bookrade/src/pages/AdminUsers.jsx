import React from 'react'
import Sidebar from '../components/SideBar'
import AdminHeader from '../components/AdminHeader'
import Users from '../components/Users'

const AdminUsers = () => {
  return (
    <div className='admin-row-1'>
    <Sidebar/>
    
    <div className='w-11/12'>
    <AdminHeader/>
    <div className='content show-book-card '>
        <Users/>
    </div>

    </div> 
</div>
  )
}

export default AdminUsers