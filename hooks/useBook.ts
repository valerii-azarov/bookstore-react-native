import { useState, useCallback, useEffect } from "react";
import booksApi from "@/api/booksApi";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { Book, CreateBook, EditableBookField, EditableBookValueType, ResponseType } from "@/types";

export interface BookReturn {
  data: Book | null;
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  response: ResponseType | null;
  createBook: (bookData: CreateBook) => Promise<void>;
  updateBook: (field: EditableBookField, value: EditableBookValueType) => Promise<void>;
  refresh: () => Promise<void>;
}

export const useBook = (bookId: string = ""): BookReturn => {
  const { t } = useLanguageContext();
  
  const [data, setData] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [response, setResponse] = useState<ResponseType | null>(null);

  const loadBook = useCallback(async () => {
    if (!bookId) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);

    await booksApi.getBookById(bookId)
      .then((book) => {
        setData(book);
        setResponse({ status: "success" });
      })
      .catch((error) => {
        setData(null);
        setResponse({ status: "error", message: error.message });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [bookId]);

  const createBook = useCallback(async (bookData: CreateBook) => {
    setIsCreating(true);

    await booksApi.createBook(bookData)
      .then(() => {
        setResponse({ status: "success" });
      })
      .catch((error) => {
        const errors: Record<string, string> = {
          "image/invalid-image-object": "image.invalidImageObject",
          "image/no-secure-url": "image.noSecureUrl",
          "books/upload-failed": "books.uploadFailed",
          "books/upload-additional-failed": "books.uploadAdditionalFailed",  
        };
        
        const errorKey = Object.keys(errors).find((key) => error.message.includes(key));
        const message = errorKey ? t(`errorMessages.${errors[errorKey]}`) : error.message;
        
        setResponse({ status: "error", message });
      })
      .finally(() => {
        setIsCreating(false);
      });
  }, [t]);

  const updateBook = useCallback(async (field: EditableBookField, value: EditableBookValueType) => {
    if (!bookId) return;
    setIsUpdating(true);

    await booksApi.updateBook(bookId, field, value)
      .then(() => setResponse({ status: "success" }))
      .catch((error) => {
        const errors: Record<string, string> = {
          "image/invalid-image-object": "image.invalidImageObject",
          "image/no-secure-url": "image.noSecureUrl",
          "image/invalid-url": "image.invalidUrl",
          "image/delete-failed": "image.deleteFailed",
          "books/book-not-found": "books.bookNotFound",
          "books/upload-failed": "books.uploadFailed",
          "books/upload-additional-failed": "books.uploadAdditionalFailed",
        };
        
        const errorKey = Object.keys(errors).find((key) => error.message.includes(key));
        const message = errorKey ? t(`errorMessages.${errors[errorKey]}`) : error.message;                        
        
        setResponse({ status: "error", message });
      })
      .finally(() => {
        setIsUpdating(false);
      });
  }, [bookId]);

  const refresh = useCallback(async () => {
    await loadBook();
  }, [loadBook]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadBook();
    }, 500);

    return () => clearTimeout(timer);
  }, [bookId, loadBook]);

  return {
    data,
    isLoading,
    isCreating,
    isUpdating,
    response,
    createBook,
    updateBook,
    refresh,
  };
};