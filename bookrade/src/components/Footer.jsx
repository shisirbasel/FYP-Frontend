import '../css/footer.css'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, TwitterX } from 'react-bootstrap-icons'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-element">
            <h1>Bookrade</h1>

            <div className="about">
                <p><span className='fas fa-envelope'/><Link>bookrade.mails@gmail.com</Link></p>
                <p><span className='fas fa-location-dot'/><Link>Kathmandu</Link></p>
                <p><span className='fas fa-phone'/><Link>+977 01-429999</Link></p>
            </div>
        </div>
        <div className="footer-element">
            <h1>Quick Links</h1>
            <div className="links">
                <p><span className='fas fa-arrow-right'/><Link>bookrade.mails@gmail.com</Link></p>
                <p><span className='fas fa-arrow-right'/><Link>Kathmandu</Link></p>
                <p><span className='fas fa-arrow-right'/><Link>+977 01-429999</Link></p>
            </div>
        </div>
        <div className="footer-element ">
            <h1>Follow Us</h1>
            <div className="medias ">
                <Link to="https://www.facebook.com"><Facebook/></Link>
                <Link to="https://www.instagram.com"><Instagram/></Link>
                <Link to="https://www.twitter.com"><TwitterX/></Link>
            </div>
        </div>  
    </div>
  )
}

export default Footer