import { doc, getDoc, getDocs, setDoc, updateDoc, collection } from "@firebase/firestore";
import { db } from "./firebase";
import imagesApi from "./imagesApi";
import { fuseSearch } from "@/helpers/fuseSearch";
import { CreateBookType, BookType, BookPriceType, EditBookFieldType, EditBookValueType, SearchKey } from "@/types";

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

  updateBook: async (bookId: string, field: EditBookFieldType, value: EditBookValueType) => {
    const bookRef = doc(db, "books", bookId);
    const updatedAt = new Date().toISOString();

    if (field === "pricing") {
      if (value && typeof value === "object" && !Array.isArray(value)) {
        const { price, originalPrice, discount } = value as BookPriceType;
        await updateDoc(bookRef, {
          price: price || 0,
          originalPrice: originalPrice || 0,
          discount: discount || 0,
          updatedAt,
        });
      }
      return;
    }

    if (field === "images") {
      if (value && Array.isArray(value)) {
        const [coverImage, ...additionalImages] = value as string[];
        await updateDoc(bookRef, {
          coverImage: coverImage || "",
          additionalImages: additionalImages.length > 0 ? additionalImages : [],
          updatedAt,
        });
      }
      return;
    }
    
    await updateDoc(bookRef, {
      [field]: value,
      updatedAt,
    });
  },  

  getBooks: async (): Promise<BookType[]> => {
    const snapshot = await getDocs(collection(db, "books"));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as BookType);
  },
  
  getBookById: async (uid: string): Promise<BookType | null> => {
    const bookDoc = await getDoc(doc(db, "books", uid));
    return bookDoc.exists() ? ({ id: bookDoc.id, ...bookDoc.data() } as BookType) : null;
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
