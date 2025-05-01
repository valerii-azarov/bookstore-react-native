import axios from "axios";
import { getDocs, collection } from "@firebase/firestore";
import { db } from "./firebase";
import { crypto } from "@/helpers/crypto";
import { cloudinaryConfig } from "@/config/cloudinary";

const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`;
const CLOUDINARY_DESTROY_URL = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/destroy`;

export const imagesApi = {
  getCoverImages: async (): Promise<string[]> => {
    const snapshot = await getDocs(collection(db, "books"));
    return snapshot.docs.map(doc => doc.data().coverImage).filter((url): url is string => typeof url === "string");
  },  
  
  uploadFileToCloudinary: async (file: { uri?: string }, folderName: string): Promise<string> => {
    if (!file?.uri) {
      throw new Error("ImageError: Invalid image object (image/invalid-image-object).");
    }

    const formData = new FormData();
    formData.append("file", { 
      uri: file.uri, 
      name: file.uri.split("/").pop() || "file.jpg", 
      type: "image/jpeg" 
    } as any);
    formData.append("upload_preset", cloudinaryConfig.uploadPreset);
    formData.append("folder", folderName);

    const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!response.data.secure_url) {
      throw new Error("ImageError: Secure URL not found in response (image/no-secure-url).");
    }

    return response.data.secure_url;
  },

  deleteFileFromCloudinary: async (imageUrl: string): Promise<void> => {
    const publicId = crypto.extractPublicIdFromUrl(imageUrl);
    if (!publicId) {
      throw new Error("ImageError: Invalid image URL or unable to extract public_id (image/invalid-url).");
    }

    const timestamp = Math.floor(Date.now() / 1000).toString();
    const signature = await crypto.generateSignature(publicId, timestamp, cloudinaryConfig.apiSecret);

    const formData = new FormData();
    formData.append("public_id", publicId);
    formData.append("api_key", cloudinaryConfig.apiKey);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp);

    const response = await axios.post(CLOUDINARY_DESTROY_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.result !== "ok") {
      throw new Error("ImageError: Failed to delete image from Cloudinary (image/delete-failed).");
    }
  },
};
