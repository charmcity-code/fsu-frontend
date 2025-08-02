import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <header>
      <h1>Fullstack University</h1>
      <nav>
        <NavLink to="/departments">Departments</NavLink> |{" "}
        <NavLink to="/faculty">Faculty</NavLink>
      </nav>
    </header>
  );
}
