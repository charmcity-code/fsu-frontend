import { useAuth } from "../auth/AuthContext";

import DepartmentList from "./DepartmentList";

import DepartmentForm from "./DepartmentForm";

export default function DepartmentPage() {
    const { token } = useAuth();
    return (
        <>
        <h1>Our Departments</h1>
        <DepartmentList />
        {token && <DepartmentForm />}
        </>
    );
}