import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/api/firebase";
import authApi from "@/api/authApi";
import { UserType, Role } from "@/types";

type AuthContextType = {
  user: UserType;
  setUser: (user: UserType) => void;
  isLoggedIn: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userData = await authApi.getUser(firebaseUser.uid);
        setUser(userData);
        setIsLoggedIn(true);
        setIsAdmin(userData?.role === Role.Admin);
      } else {
        setUser(null);
        setIsLoggedIn(false);
        setIsAdmin(false);
      }

      setInitialized(true);
    });

    return () => unsubscribe();
  }, []);

  if (!initialized) return null;

  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => useContext(AuthContext);
