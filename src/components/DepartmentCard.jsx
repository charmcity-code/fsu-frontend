import { Link } from "react-router";

export default function DepartmentCard({ department }) {
  return (
    <div className="card">
      <h3>{department.name}</h3>
      <img
        src={department.images} // Change this from department.imageUrl
        alt={`Banner for ${department.name}`}
        width="400"
      />
      <p>{department.description}</p>
      <Link to={`/departments/${department.id}`}>View Department</Link>
    </div>
  );
}
