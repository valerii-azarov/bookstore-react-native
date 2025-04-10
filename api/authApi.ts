import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "@firebase/firestore";
import { db, auth } from "./firebase";
import { BaseUser } from "@/types";

const authApi = {
  signIn: async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  },

  signUp: async (firstName: string, lastName: string, email: string, password: string) => {
    const response = await createUserWithEmailAndPassword(
      auth, 
      email, 
      password,
    );
    await setDoc(doc(db, "users", response?.user?.uid), { 
      firstName, 
      lastName, 
      email, 
      role: 1,
      uid: response?.user?.uid,
    });
    return response?.user;    
  },

  logout: async () => await signOut(auth),

  getUser: async (uid: string) => {
    const userDoc = await getDoc(doc(db, "users", uid));
    return userDoc.exists() ? (userDoc.data() as BaseUser) : null;
  },
};

export default authApi;
