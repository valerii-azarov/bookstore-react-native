import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { db } from "./firebase";
import { EditFieldType } from "@/types";

const profileApi = {
  updateProfile: async (uid: string, updatedData: Partial<EditFieldType>, setUser: Function) => {
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, updatedData);
    const updatedUserDocSnap = await getDoc(userDocRef);

    if (updatedUserDocSnap.exists()) {
      const data = updatedUserDocSnap.data();
      setUser({
        uid: data?.uid || "",
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data?.email || "",
        role: data?.role || 1,
      });
    }
  },
};

export default profileApi;
