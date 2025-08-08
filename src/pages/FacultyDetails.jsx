import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchFacultyById, fetchDepartments } from "../api/api";
import { Link } from "react-router";

export default function FacultyDetails() {
  const { id } = useParams();
  const [professor, setProfessor] = useState(null);
  const [department, setDepartment] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const prof = await fetchFacultyById(id);
        setProfessor(prof);

        const departments = await fetchDepartments();
        const dept = departments.find((d) => d.id === prof.department_id);
        setDepartment(dept);
      } catch (err) {
        setError(err.message);
      }
    }

    load();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!professor) return <p>Loading professor...</p>;

  return (
    <div>
      <img
        // Change profileImg to profileImage here
        src={professor.profileImage}
        alt={`Profile of ${professor.name}`}
        width="100"
      />
      <h2>{professor.name}</h2>
      <p>{professor.bio}</p>
      <p>Email: {professor.contactInfo}</p>
      <p>
        Department:{" "}
        {department ? (
          <Link to={`/departments/${department.id}`}>{department.name}</Link>
        ) : (
          "N/A"
        )}
      </p>
    </div>
  );
}
