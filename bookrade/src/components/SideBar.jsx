import { useState, useEffect } from 'react';
import '../css/sidebar.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logos/logo-green.png';
import { logout } from '../state/authSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';



const Sidebar = () => {

  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    toast.success("Logout Successful.")
    dispatch(logout());
  };

  return (
    <div className="sidebar">
      <div className="logo" style={{display:'flex'}}>
        <img src={logo} alt=""  className=''/>
        <h1 className='text-4xl text-white font-bold mt-10'>Bookrade</h1>
      </div>
          <Link to='/admin/dashboard' className='navlink'>
            <span className='fas fa-chart-line'/>Dashboard
          </Link>
          <Link to='/admin/users' className='navlink'>
            <span className='fas fa-user'/>Users
          </Link>
          <Link to='/admin/books' className='navlink'>
            <span className='fas fa-book'/>Books
          </Link>
          <Link to='/admin/trade-requests' className='navlink'>
            <span className='fas fa-plus'/>Trade Requests
          </Link>
          <Link to='/admin/trade-meets' className='navlink'>
            <span className='fas fa-handshake'/>Trade Meets
          </Link>
           <Link to='/admin/reports' className='navlink'>
            <span className='fas fa-circle-exclamation'/>User Reports
          </Link>
          <Link className='navlink' onClick={handleLogout}>
        <span className='fas fa-sign-out'/>Logout
      </Link>
    </div>
  );
}

export default Sidebar;
