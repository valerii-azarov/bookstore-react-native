import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "@firebase/firestore";
import { db, auth } from "./firebase";
import { BaseUser } from "@/types";

export const authApi = {
  signIn: async (email: string, password: string): Promise<BaseUser> => {
    const response = await signInWithEmailAndPassword(auth, email, password);
  
    const userDoc = await getDoc(doc(db, "users", response.user.uid));
    if (!userDoc.exists()) {
      throw new Error("UserError: User not found (users/user-not-found)");
    }

    return userDoc.data() as BaseUser;
  },

  signUp: async (firstName: string, lastName: string, email: string, password: string) => {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    
    const userData: BaseUser = { 
      firstName, 
      lastName, 
      email, 
      role: 1,
      uid: response.user.uid,
    };

    await setDoc(doc(db, "users", response.user.uid), userData);

    return userData;
  },

  logout: async (): Promise<void> => await signOut(auth),

  getUser: async (uid: string): Promise<BaseUser | null> => {
    const userDoc = await getDoc(doc(db, "users", uid));
    return userDoc.exists() ? (userDoc.data() as BaseUser) : null;
  },
};

