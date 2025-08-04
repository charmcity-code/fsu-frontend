import { createContext, useState, useContext } from "react";

// 1. Create the context
const AuthContext = createContext();

// 2. Create the provider component
export function AuthProvider({ children }) {
  // For now, we'll check localStorage for a token
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

// 3. Create a custom hook for easy access to the context
export const useAuth = () => {
  return useContext(AuthContext);
};