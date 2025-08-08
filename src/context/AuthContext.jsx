import { createContext, useState, useContext } from "react";

// Create the context
const AuthContext = createContext();

// Create the provider component
export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("authToken"));

  // This function will be called from the LoginPage
  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("authToken", newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("authToken");
  };

  const authValue = {
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}

// Create a custom hook for easy access to the context
export const useAuth = () => {
  return useContext(AuthContext);
};