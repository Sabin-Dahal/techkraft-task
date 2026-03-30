import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { LogOut, Home, User } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/dashboard">TechKraft Estates</Link>
      </div>
        <div className="nav-links">
        {user ? (
          <>
            <span className="user-info">
              <User size={16} /> {user.name} ({user.role})
            </span>
            <button onClick={handleLogout} className="logout-btn">
              <LogOut size={18} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="register-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;