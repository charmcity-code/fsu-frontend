// --- Ashley's imports ---
import "./App.css"; //
import { Routes, Route } from "react-router";
import Layout from "./layout/Layout"; //
import DepartmentsList from "./pages/DepartmentsList"; //
import DepartmentDetails from "./pages/DepartmentDetails"; //
import FacultyList from "./pages/FacultyList"; //
import FacultyDetails from "./pages/FacultyDetails"; //
import Error404 from "./pages/Error404"; //

// --- Josh's imports ---
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider } from "./context/AuthContext"; // 1. Import the provider

function App() {
  return (
    // 2. Wrap everything in the AuthProvider
    <AuthProvider>
      <h1>Welcome to FSU</h1>
      <Routes>
        {/* Public routes that use the shared Layout with Navbar */}
        <Route element={<Layout />}>
          <Route index element={<DepartmentsList />} /> {/* */}
          <Route path="/departments" element={<DepartmentsList />} /> {/* */}
          <Route path="/departments/:id" element={<DepartmentDetails />} />{" "}
          {/* */}
          <Route path="/faculty" element={<FacultyList />} /> {/* */}
          <Route path="/faculty/:id" element={<FacultyDetails />} /> {/* */}
        </Route>
        {/* Admin routes that do NOT use the shared Layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        {/* Catch-all 404 route */}
        <Route path="*" element={<Error404 />} /> {/* */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
