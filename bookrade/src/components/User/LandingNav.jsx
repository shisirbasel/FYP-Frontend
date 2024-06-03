import { Link } from "react-router-dom"
const LandingNav = () => {
  return (
    <div className="header-1" style={{backgroundColor:"#219150", padding:"1.2rem 9%"}}>

        <Link to="/" className="logo" style={{color:"white"}}><i className="fas fa-book" style={{color:"white"}}/> Bookrade</Link>

        <div className="icons">
            <Link id="login-btn" className="fas fa-user profile" style={{color:"white"}} to='/profile'/>
        </div>
    </div>
  )
}

export default LandingNav