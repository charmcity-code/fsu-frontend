import "./App.css";
import { Routes, Route } from "react-router";

import Layout from "./layout/Layout.jsx";
import Register from "./auth/Register.jsx";
import Login from "./auth/Login";
import HomePage from "./HomePage.jsx";
import DepartmentPage from "./departments/DepartmentPage.jsx";
import DepartmentDetails from "./departments/DepartmentDetails.jsx";
import ProfessorPage from "./faculty/ProfessorPage.jsx";
import ProfessorDetails from "./faculty/ProfessorDetails.jsx"
import Error404 from "./Error404.jsx";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/departments" element={<DepartmentPage />} />
        <Route path="/departments/:id" element={<DepartmentDetails />} />
        <Route path="/professors" element={<ProfessorPage />} />
        <Route path="/professors/:id" element={<ProfessorDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}

export default App;
