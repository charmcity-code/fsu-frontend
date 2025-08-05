// --- Ashley's imports ---
import "./App.css";
import { Routes, Route, Outlet } from "react-router";
import Layout from "./layout/Layout";
import DepartmentsList from "./pages/DepartmentsList";
import DepartmentDetails from "./pages/DepartmentDetails";
import FacultyList from "./pages/FacultyList";
import FacultyDetails from "./pages/FacultyDetails";
import Error404 from "./pages/Error404";

// --- Josh's imports ---
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import ManageDepartments from "./pages/admin/ManageDepartments";
import ManageFaculty from "./pages/admin/ManageFaculty";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <h1>Welcome to FSU</h1>
      <Routes>
        <Route element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<DepartmentsList />} />
          <Route path="/departments" element={<DepartmentsList />} />
          <Route path="/departments/:id" element={<DepartmentDetails />} />
          <Route path="/faculty" element={<FacultyList />} />
          <Route path="/faculty/:id" element={<FacultyDetails />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route 
            path="/admin" 
            element={ <ProtectedRoute> <Outlet /> </ProtectedRoute> }
          >
            <Route path="departments" element={<ManageDepartments />} />
            <Route path="faculty" element={<ManageFaculty />} />
          </Route>

          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;