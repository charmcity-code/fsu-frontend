import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom"; // Use NavLink for internal navigation

export default function AdminDashboard() {
  const { logout } = useAuth(); // Get the logout function

  return (
    <div style={{ display: "flex" }}>
      <aside
        style={{
          width: "200px",
          borderRight: "1px solid #ccc",
          padding: "1rem",
        }}
      >
        <h2>Admin Menu</h2>
        <nav style={{ display: "flex", flexDirection: "column" }}>
          {/* These links don't go anywhere yet, but set up the structure */}
          <NavLink to="/admin/departments">Manage Departments</NavLink>
          <NavLink to="/admin/faculty">Manage Faculty</NavLink>
          <button onClick={logout} style={{ marginTop: "1rem" }}>
            Logout
          </button>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: "1rem" }}>
        <h1>Admin Dashboard</h1>
        <p>Welcome! Select an option from the menu to get started.</p>
        {/* The content for managing departments/faculty will go here */}
      </main>
    </div>
  );
}
