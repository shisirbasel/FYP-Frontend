import { Link } from 'react-router-dom';

const BottomNav = () => {
  return (
    <div>
      <nav className="bottom-navbar">
        <Link to="/" className="fas fa-home"></Link>
        <Link to="/explore" className="fas fa-list"></Link>
        <Link to="/favorites" className="fas fa-star"></Link>
        <Link to="/notifications" className="fas fa-bell"></Link>
      </nav>
    </div>
  );
};

export default BottomNav;
