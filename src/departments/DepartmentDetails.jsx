// show single dept detaisl
import { useParams } from "react-router-dom";

const dummyDepartments = [
  {
    id: 1,
    name: "Computer Science",
    description: "The Computer Science Department",
    contact: "cs@fsu.edu",
    faculty: ["Dr. Smith", "Dr. Jones"],
  },
  {
    id: 2,
    name: "Mathematics",
    description: "The Math Department",
    contact: "math@fsu.edu",
    faculty: ["Dr. Taylor", "Dr. Johnson"],
  },
];

export default function DepartmentDetails() {
  const { id } = useParams();
  const department = dummyDepartments.find((d) => d.id === parseInt(id));

  if (!department) return <p>Department not found</p>;

  return (
    <div>
      <h1>{department.name}</h1>
      <p>{department.description}</p>
      <p>Contact: {department.contact}</p>
      <h2>Faculty</h2>
      <ul>
        {department.faculty.map((prof, i) => (
          <li key={i}>{prof}</li>
        ))}
      </ul>
    </div>
  );
}
