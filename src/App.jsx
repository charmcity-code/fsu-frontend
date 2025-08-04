import "./App.css"; //V
import { Routes, Route } from "react-router";
import Layout from "./layout/Layout";
import DepartmentsList from "./pages/DepartmentsList";
import DepartmentDetails from "./pages/DepartmentDetails";
import FacultyList from "./pages/FacultyList";
import FacultyDetails from "./pages/FacultyDetails";
import Error404 from "./pages/Error404"; //^

function App() {
  return (
    <>
      <h1>Welcome to FSU</h1>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<DepartmentsList />} />
          <Route path="/departments" element={<DepartmentsList />} />
          <Route path="/departments/:id" element={<DepartmentDetails />} />
          <Route path="/faculty" element={<FacultyList />} />
          <Route path="/faculty/:id" element={<FacultyDetails />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </>
  );
}
//added routes

export default App;
