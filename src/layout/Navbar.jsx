import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from '../assets/Logo.png'; 
import './Navbar.css';

export default function Navbar() {
  const { token } = useAuth(); // Removed unused 'logout' to prevent warnings

  return (
    <header>
      {/* This branding block now contains the logo and both text lines */}
      <div className="navbar-branding">
        <img src={logo} alt="Fullstack University Logo" className="navbar-logo" />
        <div className="navbar-titles">
          <h1>Welcome to AU<br/>Aspirion University</h1>
          <p className="navbar-motto">Aspire Higher, Always.</p>
        </div>
      </div>
      
      <nav>
        <NavLink to="/departments">Departments</NavLink>
        <NavLink to="/faculty">Faculty</NavLink>
        {token ? (
          <NavLink to="/admin">Admin</NavLink>
        ) : (
          <>
            <NavLink to="/login">Admin Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}