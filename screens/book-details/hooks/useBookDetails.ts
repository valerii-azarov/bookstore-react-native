import { useState, useCallback, useEffect } from "react";
import booksApi from "@/api/booksApi";
import { BookType, ResponseType } from "@/types";

export interface BookDetailsReturn {
  data: BookType | null;
  isLoading: boolean;
  response: ResponseType | null; 
  refresh: () => void;
}

export const useBookDetails = (bookId: string): BookDetailsReturn => {
  const [data, setData] = useState<BookType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<ResponseType | null>(null);
  
  const loadBook = useCallback(async () => {
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

  const refresh = () => {
    loadBook();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadBook();
    }, 500);

    return () => clearTimeout(timer);
  }, [loadBook]);

  return {
    data,
    isLoading,
    response,
    refresh,
  };
};
