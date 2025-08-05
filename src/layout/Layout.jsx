import { Outlet, NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";
import "./Layout.css";

export default function Layout() {
  // Get the token and logout function from the Auth Context
  const { token, logout } = useAuth();

  return (
    <>
      <Navbar />
      <div className="main-layout-container">
        {/* Conditionally render the Admin Sidebar if a token exists */}
        {token && (
          <aside className="admin-sidebar">
            <h2>Admin Menu</h2>
            <nav>
              <NavLink to="/admin/departments">Manage Departments</NavLink>
              <NavLink to="/admin/faculty">Manage Faculty</NavLink>
              <button onClick={logout}>Logout</button>
            </nav>
          </aside>
        )}

        {/* The main page content will render here */}
        <main className="main-content-area">
          <Outlet />
        </main>
      </div>
    </>
  );
}