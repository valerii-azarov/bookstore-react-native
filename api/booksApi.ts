import { doc, setDoc, collection } from "@firebase/firestore";
import { db } from "./firebase";
import imagesApi from "./imagesApi";
import { CreateBookType } from "@/types";

const booksApi = {
  createBook: async (bookData: CreateBookType) => {
    if (bookData.coverImage) {
      const secureUrl = await imagesApi.uploadFileToCloudinary({ uri: bookData.coverImage }, "books");

      if (!secureUrl) {
        throw new Error("BooksError: Failed to upload image (books/upload-failed).");
      }

      bookData.coverImage = secureUrl;
    }

    await setDoc(doc(collection(db, "books")), bookData);
  },
};

export default booksApi;