import { doc, getDoc, getDocs, setDoc, collection } from "@firebase/firestore";
import { db } from "./firebase";
import imagesApi from "./imagesApi";
import { fuseSearch } from "@/helpers/fuseSearch";
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
  
  getBookById: async (uid: string): Promise<BookType | null> => {
    const bookDoc = await getDoc(doc(db, "books", uid));
    return bookDoc.exists() ? (bookDoc.data() as BookType) : null;
  },

  searchBooks: async (searchQuery: string, limit: number = 5, offset: number = 0, keys: SearchKey[]): Promise<BookType[]> => {
    const books = await booksApi.getBooks();

    if (!searchQuery.trim()) {
      return books.slice(offset, offset + limit);
    }
    
    const fuse = fuseSearch<BookType>(books, keys);
    
    const result = fuse.search(searchQuery.trim()).map(item => item.item);
    return result.slice(offset, offset + limit);
  },
};

export default booksApi;
