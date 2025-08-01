import { departments } from "../data/departments";
import DepartmentCard from "../components/DepartmentCard";

export default function DepartmentsList() {
  return (
    <div>
      <h2>Departments</h2>
      {departments.map((dept) => (
        <DepartmentCard key={dept.id} department={dept} />
      ))}
    </div>
  );
}
