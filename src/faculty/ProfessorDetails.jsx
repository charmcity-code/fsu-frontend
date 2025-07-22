import { useNavigate, useParams } from "react-router";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";

export default function ProfessorDetails() {
  const { token } = useAuth();
  const { id } = useParams();
  const {
    data: professor,
    loading,
    error,
  } = useQuery(`/professors/${id}`, "professor");

  if (loading) return <p>Loading...</p>;
  if (error || !professor) return <p>Sorry! {error}</p>;

  return (
    <>
      <h1>{professor.name}</h1>
      <p>Department: {professor.department}</p>
      {/* {token && <ReserveButton id={book.id} available={book.available} />} */}
    </>
  );
}