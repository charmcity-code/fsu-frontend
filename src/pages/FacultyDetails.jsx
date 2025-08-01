import { useParams } from "react-router";

export default function FacultyDetails() {
  const { id } = useParams();
  return <h2>Faculty Details Page for ID: {id}</h2>;
}
