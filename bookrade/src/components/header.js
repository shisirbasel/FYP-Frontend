import React, { useState } from 'react'
import "./../css/navigation.css"

const Header = () => {

  const [ShowSearchBar, setShowSearchBar] = useState(false)

    
  
  return (
    <div className="header-1">
        <a href="home" className="logo"><i className="fas fa-book"></i>Bookrade</a>


        <form action="" className={ ShowSearchBar ?  'search-form active' : 'search-form' }   >
            <input type="search" placeholder = "Search" id="search-box"/>
            <label for="search-box" className="fas fa-search"></label>
        </form> 

        <div className="icons">
            <div id="search-btn" onClick={()=>setShowSearchBar(!ShowSearchBar)} className="fas fa-search"></div>
            <a href="" className="fas fa-heart"></a>
            <a href="" className="fas fa-message"></a>
            <a href=""  id = "notification-btn" class="fas fa-bell"></a>
            <div id="login-btn" className="fas fa-user"></div>
        </div>
    </div>
  )
}

export default Header