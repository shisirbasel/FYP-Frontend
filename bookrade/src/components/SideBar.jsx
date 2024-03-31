import { useState, useEffect } from 'react';
import '../css/sidebar.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logos/logo-color.png';
import { logout } from '../state/authSlice';
import { useDispatch } from 'react-redux';



const Sidebar = () => {

  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };


  return (
    <div className="sidebar">
      <div className="logo" style={{display:'flex'}}>
        <img src={logo} alt="" />
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
          <Link className='navlink'>
            <span className='fas fa-handshake'/>Trade Meets
          </Link>
          <Link className='navlink' onClick={handleLogout}>
        <span className='fas fa-sign-out'/>Logout
      </Link>
    </div>
  );
}

export default Sidebar;
