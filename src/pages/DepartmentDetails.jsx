import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchDepartmentById, fetchFaculty } from "../api/api";
import FacultyCard from "../components/FacultyCard";

export default function DepartmentDetails() {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);
  const [facultyList, setFacultyList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const dept = await fetchDepartmentById(id);
        setDepartment(dept);

        const allFaculty = await fetchFaculty();
        const deptFaculty = allFaculty.filter(
          (f) => f.departmentId === parseInt(id)
        );
        setFacultyList(deptFaculty);
      } catch (err) {
        setError(err.message);
      }
    }

    load();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!department) return <p>Loading department...</p>;

  return (
    <div>
      <h2>{department.name}</h2>
      <img
        src={department.images} // Change this from department.imageUrl
        alt={`Banner for ${department.name}`}
        width="400"
      />
      <p>{department.description}</p>
      <p>Contact: {department.contact}</p>

      <h3>Faculty</h3>
      {facultyList.map((prof) => (
        <FacultyCard key={prof.id} professor={prof} />
      ))}
    </div>
  );
}
