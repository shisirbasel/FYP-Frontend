import React, { useState } from 'react'
import "./../css/navigation.css"
import { Link } from 'react-router-dom'

const Header = () => {

  const [ShowSearchBar, setShowSearchBar] = useState(false)

    
  
  return (
    <div className="header-1">
        <Link to="/" className="logo"><i className="fas fa-book"></i>Bookrade</Link>


        <form className={ ShowSearchBar ?  'search-form active' : 'search-form' }   >
            <input type="search" placeholder = "Search" id="search-box"/>
            <label htmlFor="search-box" className="fas fa-search"></label>
        </form> 

        <div className="icons">
            <div id="search-btn" onClick={()=>setShowSearchBar(!ShowSearchBar)} className="fas fa-search"></div>
            <a href="" className="fas fa-heart"></a>
            <a href="" className="fas fa-message"></a>
            <a href=""  id = "notification-btn" className="fas fa-bell"></a>
            <div id="login-btn" className="fas fa-user"></div>
        </div>
    </div>
  )
}

export default Header