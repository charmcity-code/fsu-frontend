import { useEffect, useState } from "react";
import DepartmentCard from "../components/DepartmentCard";
import { fetchDepartments } from "../api/api";

export default function DepartmentsList() {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDepartments()
      .then(setDepartments)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>{error}</p>;
  if (!departments.length) return <p>Loading departments...</p>;

  return (
    <div>
      <h2>Departments</h2>
      {departments.map((dept) => (
        <DepartmentCard key={dept.id} department={dept} />
      ))}
    </div>
  );
}
