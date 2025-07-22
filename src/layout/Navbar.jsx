import { NavLink } from "react-router";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  return (
    <header>
      <p>Fullstack University</p>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/professors">Professors</NavLink>
        <NavLink to="/departments">Departments</NavLink>
          {token ? (
            <a onClick={() => logout()}>Log out</a>
          ) : (
            <>
              <NavLink to="/register">Register</NavLink>
              <NavLink to="/login">Login</NavLink>
            </>
        )}
      </nav>
    </header>
  );
}
