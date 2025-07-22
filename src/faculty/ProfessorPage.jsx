import { useAuth } from "../auth/AuthContext";

import ProfessorList from "./ProfessorList";

import ProfessorForm from "./ProfessorForm";

export default function ProfessorPage() {
    const { token } = useAuth();
    return (
        <>
        <h1>Meet our Professors!</h1>
        <ProfessorList />
        {token && <ProfessorForm />}
        </>
    );
}