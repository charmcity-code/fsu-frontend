// import { Outlet, NavLink } from "react-router-dom";

// export default function Layout() {
//   return (
//     <>
//       <nav style={navStyle}>
//         <NavLink to="/" style={linkStyle} end>
//           Home
//         </NavLink>
//         <NavLink to="/departments" style={linkStyle}>
//           Departments
//         </NavLink>
//         <NavLink to="/professors" style={linkStyle}>
//           Professors
//         </NavLink>
//         <NavLink to="/login" style={linkStyle}>
//           Login
//         </NavLink>
//         <NavLink to="/register" style={linkStyle}>
//           Register
//         </NavLink>
//       </nav>

//       <main style={mainStyle}>
//         <Outlet />
//       </main>
//     </>
//   );
// }

// const navStyle = {
//   padding: "1rem",
//   backgroundColor: "#004080",
//   display: "flex",
//   gap: "1rem",
// };

// const linkStyle = ({ isActive }) => ({
//   color: isActive ? "#ffd700" : "white",
//   textDecoration: "none",
//   fontWeight: "bold",
// });

// const mainStyle = {
//   padding: "2rem",
//   maxWidth: "900px",
//   margin: "auto",
// };
import { Outlet, NavLink } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <nav style={navStyle}>
        <NavLink to="/" style={linkStyle} end>
          Home
        </NavLink>
        <NavLink to="/departments" style={linkStyle}>
          Departments
        </NavLink>
        <NavLink to="/professors" style={linkStyle}>
          Professors
        </NavLink>
        <NavLink to="/login" style={linkStyle}>
          Login
        </NavLink>
        <NavLink to="/register" style={linkStyle}>
          Register
        </NavLink>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  );
}

const navStyle = {
  padding: "1rem 2rem",
  backgroundColor: "#004080",
  display: "flex",
  gap: "1.5rem",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  alignItems: "center",
};

const linkStyle = ({ isActive }) => ({
  color: isActive ? "#ffd700" : "white",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "1.1rem",
  padding: "0.5rem 0",
  borderBottom: isActive ? "3px solid #ffd700" : "3px solid transparent",
  transition: "border-bottom 0.2s ease",
});
