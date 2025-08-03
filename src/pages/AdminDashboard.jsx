import { useAuth } from "../context/AuthContext";
import { NavLink, Outlet } from "react-router";

export default function AdminDashboard() {
  const { logout } = useAuth(); // Get the logout function

  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: "200px", borderRight: "1px solid #ccc", padding: "1rem" }}>
        <h2>Admin Menu</h2>
        <nav style={{ display: "flex", flexDirection: "column" }}>
          {/* These links now point to your new pages */}
          <NavLink to="/admin/departments">Manage Departments</NavLink>
          <NavLink to="/admin/faculty">Manage Faculty</NavLink>
          <button onClick={logout} style={{ marginTop: "1rem" }}>
            Logout
          </button>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: "1rem" }}>
        {/* 2. Add the Outlet here. This is where the nested routes will render. */}
        <Outlet />
      </main>
    </div>
  );
}