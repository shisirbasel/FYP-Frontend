import '../../css/footer.css'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, TwitterX } from 'react-bootstrap-icons'
import logo from '../../assets/logos/logo-green.png';

const Footer = () => {
  return (
    <div className='footer-container'>
        <div className='footer'>
            <div className="footer-element justify-center items">
                <div className='flex items-center justify-center' style={{marginTop: '-20px'}}>
                    <img src={logo} alt="" className='w-36 h-36' style={{ marginLeft: '-30px' }} />
                    <h1>Bookrade</h1>
                </div>
                <div className="about" style={{marginTop: '-15px'}}>
                    <p><span className='fas fa-envelope'/><Link to="/">bookrade.mails@gmail.com</Link></p>
                    <p><span className='fas fa-location-dot'/><Link to="/">Kathmandu</Link></p>
                    <p><span className='fas fa-phone'/><Link to="/">+977 01-429999</Link></p>
                </div>
            </div>
            <div className="footer-element">
                <h1 className='ml-4'>Quick Links</h1>
                <div className="links">
                    <p><span className='fas fa-arrow-right'/><Link to="/">Home</Link></p>
                    <p><span className='fas fa-arrow-right'/><Link to="/explore">Explore</Link></p>
                    <p><span className='fas fa-arrow-right'/><Link to="/recommendations">Recommendation</Link></p>
                </div>
            </div>
            <div className="footer-element ">
                <h1 className='ml-4'>Follow Us</h1>
                <div className="medias">
                    <a href="https://www.facebook.com"><Facebook/></a>
                    <a href="https://www.instagram.com"><Instagram/></a>
                    <a href="https://www.twitter.com"><TwitterX/></a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer;
