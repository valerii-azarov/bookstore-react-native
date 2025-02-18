import axios from "axios";

const CLOUD_NAME = "dzpmzxss6";
const UPLOAD_PRESET = "images";
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

const imagesApi = {
  uploadFileToCloudinary: async (file: { uri?: string }, folderName: string): Promise<string> => {
    if (!file?.uri) {
      throw new Error("ImageError: Invalid image object (image/invalid-image-object).");
    }

    const formData = new FormData();

    formData.append("file", { uri: file.uri, name: file.uri.split("/").pop() || "file.jpg", type: "image/jpeg" } as any);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", folderName);

    const response = await axios.post(CLOUDINARY_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!response.data.secure_url) {
      throw new Error("ImageError: Secure URL not found in response (image/no-secure-url).");
    }

    return response.data.secure_url;
  },
};

export default imagesApi;
