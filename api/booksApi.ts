import { doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, collection } from "@firebase/firestore";
import { db } from "./firebase";
import imagesApi from "./imagesApi";
import { fuseSearch } from "@/helpers/fuseSearch";
import { Book, BookPricing, BoookImages, CreateBook, EditableBookField, EditableBookValueType, BookSearchKey } from "@/types";

const booksApi = {
  createBook: async (bookData: CreateBook) => {
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

    await setDoc(doc(collection(db, "books")), { ...bookData, createdAt });
  },

  updateBook: async (bookId: string, field: EditableBookField, value: EditableBookValueType) => {
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
      return;
    }

    if (field === "images") {
      if (value && typeof value === "object" && !Array.isArray(value)) {
        const { coverImage, additionalImages } = value as BoookImages;

        const currentBook = await booksApi.getBookById(bookId);
        if (!currentBook) {
          throw new Error("BooksError: Book not found (books/book-not-found)");
        }

        const oldCoverImage = currentBook.coverImage || "";
        const oldAdditionalImages = currentBook.additionalImages || [];
        
        const uploadedCoverImage = coverImage && coverImage !== oldCoverImage
          ? await imagesApi.uploadFileToCloudinary({ uri: coverImage }, "books") || ""
          : oldCoverImage;

        if (coverImage && coverImage !== oldCoverImage && !uploadedCoverImage) {
          throw new Error("BooksError: Failed to upload cover image (books/upload-failed).");
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
              throw new Error("BooksError: Failed to upload additional image (books/upload-additional-failed).");
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
      return;
    }

    await updateDoc(bookRef, {
      [field]: value,
      updatedAt,
    });
  },

  deleteBook: async (bookId: string) => {
    const bookRef = doc(db, "books", bookId);
    const currentBook = await booksApi.getBookById(bookId);

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

  getBooks: async (): Promise<Book[]> => {
    const snapshot = await getDocs(collection(db, "books"));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Book);
  },
  
  getBookById: async (uid: string): Promise<Book | null> => {
    const bookDoc = await getDoc(doc(db, "books", uid));
    return bookDoc.exists() ? ({ id: bookDoc.id, ...bookDoc.data() } as Book) : null;
  },

  searchBooks: async (searchQuery: string, limit: number = 5, offset: number = 0, keys: BookSearchKey[]): Promise<Book[]> => {
    const books = await booksApi.getBooks();

    if (!searchQuery.trim()) {
      return books.slice(offset, offset + limit);
    }
    
    const fuse = fuseSearch<Book>(books, keys);
    
    const result = fuse.search(searchQuery.trim()).map(item => item.item);
    return result.slice(offset, offset + limit);
  },
};

export default booksApi;
