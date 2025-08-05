import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth(); // Use the auth hook

  return (
    <header>
      <h1>Fullstack University</h1>
      <nav>
  <NavLink to="/departments">Departments</NavLink> |{" "}
  <NavLink to="/faculty">Faculty</NavLink>
  {token ? (
    <button onClick={logout}>Logout</button>
  ) : (
    <>
      <NavLink to="/login"> | Admin Login</NavLink> |{" "}
      <NavLink to="/register">Register</NavLink>
    </>
  )}
</nav>
    </header>
  );
}
