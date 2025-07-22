import { useNavigate, useParams } from "react-router";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";

export default function DepartmentDetails() {
  const { token } = useAuth();
  const { id } = useParams();
  const {
    data: department,
    loading,
    error,
  } = useQuery(`/departments/${id}`, "department");

  if (loading) return <p>Loading...</p>;
  if (error || !department) return <p>Sorry! {error}</p>;

  return (
    <>
      <h1>{department.name}</h1>
      <p>Areas: {department.areas}</p>
      {/* {token && <ReserveButton id={book.id} available={book.available} />} */}
    </>
  );
}