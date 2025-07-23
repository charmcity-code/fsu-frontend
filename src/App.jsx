// function App() {
//   return (
//     <>
//       <h1>Welcome to FSU</h1>
//     </>
//   );
// }

// export default App;

import "./App.css";
import { Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout.jsx";

import Register from "./auth/Register.jsx";
import Login from "./auth/Login.jsx";

import HomePage from "./HomePage.jsx";

import DepartmentPage from "./departments/DepartmentPage.jsx";
import DepartmentDetails from "./departments/DepartmentDetails.jsx";

import ProfessorPage from "./faculty/ProfessorPage.jsx";
import ProfessorDetails from "./faculty/ProfessorDetails.jsx";

import Error404 from "./Error404.jsx";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />

        {/* Departments */}
        <Route path="/departments" element={<DepartmentPage />} />
        <Route path="/departments/:id" element={<DepartmentDetails />} />

        {/* Professors */}
        <Route path="/professors" element={<ProfessorPage />} />
        <Route path="/professors/:id" element={<ProfessorDetails />} />

        {/* Auth */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Catch-all */}
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}

export default App;
