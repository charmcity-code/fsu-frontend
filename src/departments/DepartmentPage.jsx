// list all the depts
import { Link } from "react-router-dom";

const dummyDepartments = [
  { id: 1, name: "Computer Science", description: "CS Dept" },
  { id: 2, name: "Mathematics", description: "Math Dept" },
];

export default function DepartmentPage() {
  return (
    <div>
      <h1>Departments</h1>
      <ul>
        {dummyDepartments.map((dept) => (
          <li key={dept.id}>
            <Link to={`/departments/${dept.id}`}>{dept.name}</Link> —{" "}
            {dept.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
