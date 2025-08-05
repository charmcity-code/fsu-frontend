import { Link } from "react-router";

export default function FacultyCard({ professor }) {
  return (
    <div className="card">
      <img
        src={professor.profileImage}
        alt={`Profile of ${professor.name}`}
        width="100"
      />
      <h4>{professor.name}</h4>
      <p>{professor.bio}</p>
      <Link to={`/faculty/${professor.id}`}>View Profile</Link>
    </div>
  );
}
