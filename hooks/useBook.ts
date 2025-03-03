import { useState, useCallback, useEffect } from "react";
import booksApi from "@/api/booksApi";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { BookType, EditBookFieldType, EditBookValueType, ResponseType } from "@/types";

export interface BookReturn {
  data: BookType | null;
  isLoading: boolean;
  isUpdating: boolean;
  response: ResponseType | null;
  updateBook: (field: EditBookFieldType, value: EditBookValueType) => Promise<void>;
  refresh: () => Promise<void>;
}

export const useBook = (bookId: string): BookReturn => {
  const { t } = useLanguageContext();
  
  const [data, setData] = useState<BookType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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

  const updateBook = useCallback(async (field: EditBookFieldType, value: EditBookValueType) => {
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
    isUpdating,
    response,
    updateBook,
    refresh,
  };
};