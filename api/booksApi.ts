import { doc, getDocs, setDoc, collection } from "@firebase/firestore";
import { db } from "./firebase";
import Fuse from "fuse.js";
import imagesApi from "./imagesApi";
import { CreateBookType, BookType, SearchKey } from "@/types";

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

  getBooks: async (): Promise<BookType[]> => {
    const snapshot = await getDocs(collection(db, "books"));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as BookType);
  },

  searchBooks: async (searchQuery: string, limit: number = 5, offset: number = 0, keys: SearchKey[]): Promise<BookType[]> => {
    const books = await booksApi.getBooks();

    if (!searchQuery.trim()) {
      return books.slice(offset, offset + limit);
    }
    
    const fuse = new Fuse(books, {
      keys,
      includeScore: true,
      threshold: 0.4,
      minMatchCharLength: 2,
      shouldSort: true,
      ignoreLocation: true,
      useExtendedSearch: true,
    });

    const result = fuse.search(searchQuery.trim()).map(item => item.item);
    return result.slice(offset, offset + limit);
  },
};

export default booksApi;
