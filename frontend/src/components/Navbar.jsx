import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { LogOut, Home, User } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // State to handle navbar visibility and scroll tracking
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // If scrolling down AND past the first 50px (to prevent jitter at the very top)
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false); // Hide
      } else {
        setIsVisible(true);  // Show
      }

      setLastScrollY(currentScrollY);
    };

    // Add passive event listener for better scrolling performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`navbar ${isVisible ? '' : 'navbar-hidden'}`}>
      <div className="nav-brand">
        <Link to="/dashboard">
        <img src="https://techkraftinc.com/wp-content/uploads/2024/05/TechKraft-Logo.svg" />
        </Link>
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