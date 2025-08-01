import { useParams } from "react-router";
import { departments } from "../data/departments";
import { faculty } from "../data/faculty";
import FacultyCard from "../components/FacultyCard";

export default function DepartmentDetails() {
  const { id } = useParams();
  const dept = departments.find((d) => d.id === parseInt(id));

  if (!dept) return <p>Department not found.</p>;

  const deptFaculty = faculty.filter((f) => dept.faculty.includes(f.id));

  return (
    <div>
      <h2>{dept.name}</h2>
      <img src={dept.imageUrl} alt={`Banner for ${dept.name}`} width="400" />
      <p>{dept.description}</p>
      <p>Contact: {dept.contact}</p>

      <h3>Faculty</h3>
      {deptFaculty.map((prof) => (
        <FacultyCard key={prof.id} professor={prof} />
      ))}
    </div>
  );
}
