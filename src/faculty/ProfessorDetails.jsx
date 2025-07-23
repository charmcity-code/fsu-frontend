// show single details

import { useParams } from "react-router-dom";

const dummyProfessors = [
  {
    id: 1,
    name: "Dr. Smith",
    bio: "Professor of Computer Science.",
    email: "smith@fsu.edu",
    department: "Computer Science",
  },
  {
    id: 2,
    name: "Dr. Johnson",
    bio: "Professor of Mathematics.",
    email: "johnson@fsu.edu",
    department: "Mathematics",
  },
];

export default function ProfessorDetails() {
  const { id } = useParams();
  const professor = dummyProfessors.find((p) => p.id === parseInt(id));

  if (!professor) return <p>Professor not found</p>;

  return (
    <div>
      <h1>{professor.name}</h1>
      <p>{professor.bio}</p>
      <p>Email: {professor.email}</p>
      <p>Department: {professor.department}</p>
    </div>
  );
}
