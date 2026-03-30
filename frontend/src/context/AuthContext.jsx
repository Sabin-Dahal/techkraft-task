import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);
  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token } = res.data;
      localStorage.setItem("token", token);
      const decoded = JSON.parse(atob(token.split(".")[1]));
      setUser(decoded);
      localStorage.setItem("user", JSON.stringify(decoded));
    } catch (err) {
      throw new Error(err.response?.data?.msg || "Login failed");
    }   
    };
    const register = async (userData) => {
    try {
      // Expecting { name, email, password, role }
      await api.post("/auth/register", userData);
    } catch (err) {
      throw new Error(err.response?.data?.msg || "Registration failed");
    }
  };
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };
    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register }}> 
            {children} 
        </AuthContext.Provider>
    )
};
export default AuthProvider;