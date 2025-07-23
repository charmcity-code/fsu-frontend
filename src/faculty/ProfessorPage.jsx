// list all the profs
import { Link } from "react-router-dom";

const dummyProfessors = [
  { id: 1, name: "Dr. Smith", department: "Computer Science" },
  { id: 2, name: "Dr. Johnson", department: "Mathematics" },
];

export default function ProfessorPage() {
  return (
    <div>
      <h1>Professors</h1>
      <ul>
        {dummyProfessors.map((prof) => (
          <li key={prof.id}>
            <Link to={`/professors/${prof.id}`}>{prof.name}</Link> —{" "}
            {prof.department}
          </li>
        ))}
      </ul>
    </div>
  );
}
