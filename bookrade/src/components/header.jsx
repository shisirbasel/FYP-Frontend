import { useContext, useState, useEffect} from 'react'
import "./../css/navigation.css"
import { Link } from 'react-router-dom'
import { SearchContext } from '../App'
import { useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import { sendGetRequest } from '../utils/api';

const Header = () => {

  const isLoggedIn = useSelector((state)=>state.auth.isLogin)

  const navigate = useNavigate()

  const [ShowSearchBar, setShowSearchBar] = useState(false)

  const [searchParams, setSearchParams] = useContext(SearchContext)
  
  const [userData, setUserData] = useState({})

  const getUserDetails = async () =>{
    if(isLoggedIn){
    const response = await sendGetRequest('profile')
    setUserData(response)}
  }

  const navigateLogin = (e) =>
  {
    e.preventDefault();
    navigate('/login')
  }

  useEffect(()=>{getUserDetails();},[])
  
  return (
    <div className="header-1">
        <Link to="/" className="logo"><i className="fas fa-book"></i>Bookrade</Link>

        {isLoggedIn? (<>
          <form onSubmit={(e)=>{e.preventDefault();navigate('/explore')}} className={ ShowSearchBar ? 'search-form active' : 'search-form' }   >
            <input type="search" value={searchParams} placeholder = "Search" id="search-box" onChange={(e)=>{setSearchParams(e.target.value)}}/>
            <label htmlFor="search-box" className="fas fa-search" onClick={()=>navigate('/explore')}></label>
        </form> 

        </>):(
          <></>
        )}
        
        <div className="icons float-right flex flex-row items-center">
          {isLoggedIn? (
            <>
              <div id="search-btn" onClick={()=>setShowSearchBar(!ShowSearchBar)} className="fas fa-search"></div>
              <Link to="" className="fas fa-heart" />
              <Link to="" className="fas fa-message" />
              <Link to=""  id = "notification-btn" className="fas fa-bell" />
              <Link id="login-btn"  to='/profile/details'><img className="h-16 w-16 rounded-full" src={`http://127.0.0.1:8000${userData.profile_picture}`} alt="" /></Link>
            </>
          ) : (
            <button onClick={navigateLogin} className='success-btn'>Login</button>
          )}
            
        </div>
    </div>
  )
}

export default Header