import { useParams } from "react-router";

export default function DepartmentDetails() {
  const { id } = useParams();
  return <h2>Department Details Page for ID: {id}</h2>;
}
