import { Link } from 'react-router-dom';

const BottomNav = () => {
  return (
    <div>
      <nav className="bottom-navbar">
        <Link to="/" className="fas fa-home"></Link>
        <Link to="/explore" className="fas fa-list"></Link>
        <Link to="/recommendations" className="fas fa-star"></Link>
        <Link to="/trade-requests" className="fas fa-handshake"></Link>
      </nav>
    </div>
  );
};

export default BottomNav;
