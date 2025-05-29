// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { checkAuth, login, logout, signup } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const { data, error } = await checkAuth();
      if (data) setUser(data.user);
      setLoading(false);
    };
    verifyAuth();
  }, []);

  const handleLogin = async (email, password) => {
    const { data, error } = await login({ email, password });
    if (data) {
      setUser(data.user);
      return { success: true };
    }
    return { success: false, error };
  };

  const handleSignup = async (userData) => {
    const { data, error } = await signup(userData);
    if (data) {
      setUser(data.user);
      return { success: true };
    }
    return { success: false, error };
  };

  const handleLogout = async () => {
    const { error } = await logout();
    if (!error) {
      setUser(null);
      return { success: true };
    }
    return { success: false, error };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login: handleLogin,
        logout: handleLogout,
        signup: handleSignup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);