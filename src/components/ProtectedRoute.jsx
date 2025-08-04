import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token } = useAuth();

  if (!token) {
    // If there's no token, redirect to the /login page
    return <Navigate to="/login" replace />;
  }

  // If there is a token, render the component that was passed in
  return children;
}