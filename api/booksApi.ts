import { doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, collection, query, orderBy, limit, startAfter, QueryDocumentSnapshot, DocumentData } from "@firebase/firestore";
import { db } from "./firebase";
import { imagesApi } from "./imagesApi";
import { fuseSearch } from "@/helpers/fuseSearch";
import { Book, CreateBook, BookPricing, BoookImages, EditableBookField, EditableBookValueType, BookSearchKey, BooksResponse } from "@/types";

export const booksApi = {
  fetchBooks: async (lastDoc?: QueryDocumentSnapshot<DocumentData> | null, pageSize: number = 5, orderByField: keyof Book = "title"): Promise<BooksResponse> => {
    const snapshot = await getDocs(
      query(collection(db, "books"), orderBy(orderByField, "desc"), limit(pageSize), ...(lastDoc ? [startAfter(lastDoc)] : []))
    );
    
    return {
      books: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Book)),
      lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
    };
  },

  fetchBookById: async (uid: string): Promise<Book | null> => {
    const bookDoc = await getDoc(doc(db, "books", uid));
    return bookDoc.exists() ? ({ id: bookDoc.id, ...bookDoc.data() } as Book) : null;
  },

  searchBooks: async (queryString: string, keys: BookSearchKey[], lastDoc?: QueryDocumentSnapshot<DocumentData> | null): Promise<BooksResponse> => {
    if (!queryString.trim()) return booksApi.fetchBooks(lastDoc);

    const snapshot = await getDocs(collection(db, "books"));
    const allBooks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Book));
    
    return { 
      books: fuseSearch<Book>(allBooks, keys).search(queryString.trim()).map(item => item.item), 
      lastDoc: null,
    };
  },

  createBook: async (bookData: CreateBook): Promise<Book> => {
    const bookRef = doc(collection(db, "books"));
    const createdAt = new Date().toISOString();
    
    if (bookData.coverImage) {
      const secureUrl = await imagesApi.uploadFileToCloudinary({ uri: bookData.coverImage }, "books"); 
      if (!secureUrl) {
        throw new Error("BooksError: Failed to upload cover image (books/upload-failed).");
      }
      bookData.coverImage = secureUrl;
    }

    if (bookData.additionalImages && bookData.additionalImages.length > 0) {
      const uploadedAdditionalImages = await Promise.all(
        bookData.additionalImages.map(async (imageUri) => {
          const secureUrl = await imagesApi.uploadFileToCloudinary({ uri: imageUri }, "books");
          if (!secureUrl) {
            throw new Error("BooksError: Failed to upload additional image (books/upload-additional-failed).");
          }
          return secureUrl;
        })
      );
      bookData.additionalImages = uploadedAdditionalImages;
    }

    await setDoc(bookRef, { ...bookData, createdAt });
    
    const createdBookDoc = await getDoc(bookRef);
    if (!createdBookDoc.exists()) {
      throw new Error("BooksError: Failed to fetch created book (books/created-book-not-found)");
    }

    return { id: createdBookDoc.id, ...createdBookDoc.data() } as Book;
  },

  updateBook: async (bookId: string, field: EditableBookField, value: EditableBookValueType): Promise<Book> => {
    const bookRef = doc(db, "books", bookId);
    const updatedAt = new Date().toISOString();

    if (field === "pricing") {
      if (value && typeof value === "object" && !Array.isArray(value)) {
        const { price, originalPrice, discount } = value as BookPricing;
        await updateDoc(bookRef, {
          price: price || 0,
          originalPrice: originalPrice || 0,
          discount: discount || 0,
          updatedAt,
        });
      }
    } else if (field === "images") {
      if (value && typeof value === "object" && !Array.isArray(value)) {
        const { coverImage, additionalImages } = value as BoookImages;

        const currentBook = await booksApi.fetchBookById(bookId);
        if (!currentBook) {
          throw new Error("BooksError: Book not found (books/book-not-found)");
        }
    
        const oldCoverImage = currentBook.coverImage || "";
        const oldAdditionalImages = currentBook.additionalImages || [];
          
        const uploadedCoverImage = coverImage && coverImage !== oldCoverImage
          ? await imagesApi.uploadFileToCloudinary({ uri: coverImage }, "books") || ""
          : oldCoverImage;
    
        if (coverImage && coverImage !== oldCoverImage && !uploadedCoverImage) {
          throw new Error("BooksError: Failed to upload cover image (books/upload-failed)");
        }
          
        if (oldCoverImage && oldCoverImage !== uploadedCoverImage && oldCoverImage !== coverImage) {
          await imagesApi.deleteFileFromCloudinary(oldCoverImage).catch((error) => {
            console.error(`Failed to delete old cover image ${oldCoverImage}:`, error);
          });
        }
          
        const newAdditionalImagesSet = new Set(additionalImages || []);
        const imagesToDelete = oldAdditionalImages.filter(img => !newAdditionalImagesSet.has(img));
    
        const uploadedAdditionalImages = await Promise.all(
          (additionalImages || []).map(async (imageUri) => {
            if (oldAdditionalImages.includes(imageUri)) return imageUri;
            const secureUrl = await imagesApi.uploadFileToCloudinary({ uri: imageUri }, "books");
            if (!secureUrl) {
              throw new Error("BooksError: Failed to upload additional image (books/upload-additional-failed)");
            }
            return secureUrl;
          })
        );
          
        await Promise.all(
          imagesToDelete.map(async (imageUrl) => {
            await imagesApi.deleteFileFromCloudinary(imageUrl).catch((error) => {
              console.error(`Failed to delete additional image ${imageUrl}:`, error);
            });
          })
        );
    
        await updateDoc(bookRef, {
          coverImage: uploadedCoverImage,
          additionalImages: uploadedAdditionalImages,
          updatedAt,
        });
      }
    } else {
      await updateDoc(bookRef, {
        [field]: value,
        updatedAt,
      });
    }
      
    const updatedBookDoc = await getDoc(bookRef);
    if (!updatedBookDoc.exists()) {
      throw new Error("BooksError: Book not found after update (books/book-not-found-after-update)");
    }
      
    return { id: updatedBookDoc.id, ...updatedBookDoc.data() } as Book;
  },

  deleteBook: async (bookId: string) => {
    const bookRef = doc(db, "books", bookId);
    const currentBook = await booksApi.fetchBookById(bookId);
  
    if (!currentBook) {
      throw new Error("BooksError: Book not found (books/book-not-found)");
    }
  
    const coverImage = currentBook.coverImage;
    const additionalImages = currentBook.additionalImages || [];
  
    if (coverImage) {
      await imagesApi.deleteFileFromCloudinary(coverImage).catch((error) => {
        console.error(`Failed to delete cover image ${coverImage}:`, error);
      });
    }
  
    if (additionalImages.length > 0) {
      await Promise.all(
        additionalImages.map(async (imageUrl) => {
          await imagesApi.deleteFileFromCloudinary(imageUrl).catch((error) => {
            console.error(`Failed to delete additional image ${imageUrl}:`, error);
          });
        })
      );
    }
      
     await deleteDoc(bookRef);
  },
};
