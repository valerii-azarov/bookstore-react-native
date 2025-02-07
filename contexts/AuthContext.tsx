import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/api/firebase";
import authApi from "@/api/authApi";
import { Role, UserType } from "@/types";

type AuthContextType = {
  user: UserType | null;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const segments = useSegments();

  const [user, setUser] = useState<UserType>(null);

  const isUserGroup = segments[0] === "(user)";
  const isAdminGroup = segments[0] === "(admin)";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userData = await authApi.getUser(firebaseUser.uid);
        if (userData) {
          setUser(userData);

          if (userData.role === Role.User && !isUserGroup) {
            router.replace("/(user)/(tabs)/books");
          }
          else if (userData.role === Role.Admin && !isAdminGroup) {
            router.replace("/(admin)/(tabs)/books");
          } 
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
        setTimeout(() => router.replace("/welcome"), 50);
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => useContext(AuthContext);
