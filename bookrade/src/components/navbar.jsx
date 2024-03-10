import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="header-2">
      <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/explore">Explore</Link>
            <Link to="/">Recommendations</Link>
      </nav>
    </div>
  );
};

export default Navbar;
