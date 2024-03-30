// import Navigation from '../components/navigation'
import Swiper from '../components/Swiper'
import LandingNav from '../components/LandingNav'
import '../css/landing.css'
import Footer from '../components/Footer'
import Navigation from '../components/navigation'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUser } from '../utils/user'

const Home = () => {
  const navigate = useNavigate();
  const is_admin = getUser();

  useEffect(
    () => {
      is_admin? navigate('/admin/dashboard') : null
    }, []
  )

  
  return (
    <>
      {/* <LandingNav/> */}
      <Navigation/>
      <Swiper />
      <div className="head" style={{backgroundColor:"#219150", padding:"1.5rem 2%"}}>
              <center><h1 style={{color:"White", fontSize:"22px"}} >Get Tradin' Books in only a few steps</h1></center>
      </div>
        
          
      <div className="home-body" style={{height: '100vh'}}>
          <div className="left"><h1 className='text-black-500 text-3xl'>1. Upload The Book You want to Trade</h1></div>
          <div className="right"><h1 className='text-black-500 text-3xl'>2. Browse Your Favorite Books</h1></div>
          <div className="left"><h1 className='text-black-500 text-3xl'>3. Pick And Initiate a Trade</h1></div>
          <div className="right"><h1 className='text-black-500 text-3xl'>4. Chat, Meet-up and Trade</h1></div>
      </div>

      <div className="home-footer">
        <div className="text"><center><p style={{fontSize:'28px'}}>Wondering <b>Why</b> You Should <b>Trade?</b></p></center></div>
        <div className="benifits flex flex-wrap gap-100">
          <div className="benifit"><p className='fas fa-piggy-bank'/> <h2>You Save Money</h2></div>
          <div className="benifit"><p className='fas fa-earth'/> <h2>You Save Money</h2></div>
          <div className="benifit"><p className='fas fa-face-laugh-beam'/> <h2>You Save Money</h2></div>
        </div>
      </div>

      <Footer/>
    
      </>
    
    
  )
}

export default Home