import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { db } from "./firebase";
import { BaseUser, ProfileField } from "@/types";

export const profileApi = {
  updateProfile: async (uid: string, field: ProfileField, value: string): Promise<BaseUser> => {
    const userRef = doc(db, "users", uid);
    
    await updateDoc(userRef, {
      [field]: value,
    });
    
    const updatedUserDoc = await getDoc(userRef);
    if (!updatedUserDoc.exists()) {
      throw new Error("UsersError: User not found after update (users/user-not-found-after-update)");
    }
          
    return { uid: updatedUserDoc.id, ...updatedUserDoc.data() } as BaseUser;
  },
};
