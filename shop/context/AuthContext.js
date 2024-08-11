"use client";
import { Me } from "@/Action/authAction";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const LoginContext = (user) => {
    setUser(user);
  };
  const LogoutContext = (user) => {
    setUser(null);
  };

  useEffect(() => {
    const checkUserLogedIn = async () => {
      const data = await Me();
      if (data?.error) {
        setUser(null);
      } else {
        setUser(data.data);
      }
    };
    checkUserLogedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ user, LoginContext , LogoutContext }}>
      {children}
    </AuthContext.Provider>
  );
};
