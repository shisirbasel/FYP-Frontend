import { useState, useEffect } from 'react';
import '../css/sidebar.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logos/logo-color.png';
import { getUser } from '../utils/user';

const Sidebar = () => {
  
  const isAdmin = getUser();

  return (
    <div className="sidebar">
      <div className="logo" style={{display:'flex'}}>
        <img src={logo} alt="" />
        <h1>Bookrade</h1>
      </div>
      {!isAdmin ? (
        <>
          <Link to='/home' className='navlink' >
            <span className='fas fa-home'/>Home
          </Link>
          <Link to='/upload' className='navlink'>
            <span className='fas fa-add'/>Upload New
          </Link>
          <Link className='navlink'>
            <span className='fas fa-bell'/>Notifications
          </Link>
          <Link to='/messages' className='navlink'>
            <span className='fas fa-message'/>Messages
          </Link>
          <Link to='/profile' className='navlink'>
            <span className='fas fa-user'/>Profile
          </Link>
        </>
      ) : (
        <>
          <Link to='/home' className='navlink'>
            <span className='fas fa-chart-line'/>Dashboard
          </Link>
          <Link to='/upload' className='navlink'>
            <span className='fas fa-user'/>Users
          </Link>
          <Link className='navlink'>
            <span className='fas fa-book'/>Books
          </Link>
          <Link className='navlink'>
            <span className='fas fa-handshake'/>Trade Meets
          </Link>
        </>
      )}
      <Link className='navlink'>
        <span className='fas fa-sign-out'/>Logout
      </Link>
    </div>
  );
}

export default Sidebar;
