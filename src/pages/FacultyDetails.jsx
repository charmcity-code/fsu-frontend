import { useParams } from "react-router";
import { faculty } from "../data/faculty";
import { departments } from "../data/departments";
import { Link } from "react-router";

export default function FacultyDetails() {
  const { id } = useParams();
  const prof = faculty.find((p) => p.id === parseInt(id));

  if (!prof) return <p>Professor not found.</p>;

  const dept = departments.find((d) => d.id === prof.departmentId);

  return (
    <div>
      <img src={prof.profileImg} alt={`Profile of ${prof.name}`} width="100" />
      <h2>{prof.name}</h2>
      <p>{prof.bio}</p>
      <p>Email: {prof.email}</p>
      <p>
        Department:{" "}
        {dept ? <Link to={`/departments/${dept.id}`}>{dept.name}</Link> : "N/A"}
      </p>
    </div>
  );
}
