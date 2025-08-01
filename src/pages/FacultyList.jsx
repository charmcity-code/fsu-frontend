import { faculty } from "../data/faculty";
import FacultyCard from "../components/FacultyCard";

export default function FacultyList() {
  return (
    <div>
      <h2>Faculty</h2>
      {faculty.map((prof) => (
        <FacultyCard key={prof.id} professor={prof} />
      ))}
    </div>
  );
}
