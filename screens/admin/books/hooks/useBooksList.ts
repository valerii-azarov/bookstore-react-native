import { useState, useCallback, useEffect } from "react";
import booksApi from "@/api/booksApi";
import { booksAdminPageSize } from "@/constants/settings";
import { BookType, ResponseType } from "@/types";

export interface BooksListReturn {
  data: BookType[];
  isLoading: boolean;
  isFetching: boolean;
  isRefreshing: boolean;
  response: ResponseType | null;
  searchText: string;
  setSearchText: (text: string) => void;
  refresh: () => void;
  loadMore: () => void; 
}

export const useBooksList = (initialQuery: string = ""): BooksListReturn => {
  const [data, setData] = useState<BookType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [response, setResponse] = useState<ResponseType | null>(null);
  const [searchText, setSearchText] = useState<string>(initialQuery);

  const loadBooks = useCallback(async (query: string, currentOffset: number, reset = false) => {
    reset ? setIsLoading(true) : setIsFetching(true);

    await booksApi.searchBooks(query, booksAdminPageSize, currentOffset, ["title", "sku"])
      .then((books) => {
        setData(reset ? books : [...data, ...books]);
        setHasMore(books.length === booksAdminPageSize);
        setResponse({ status: "success" });
      })
      .catch((error) => {
        setData(reset ? [] : data);
        setHasMore(false);
        setResponse({ status: "error", message: error.message });
      })
      .finally(() => {
        setIsLoading(false);
        setIsFetching(false);
        setIsRefreshing(false);
      });
  }, [data]);

  const refresh = useCallback(() => {
    setIsRefreshing(true);
    setOffset(0);
    loadBooks(searchText, 0, true);
  }, [searchText]);

  const loadMore = useCallback(() => {
    if (hasMore && !isLoading && !isFetching && !isRefreshing) {
      const newOffset = offset + booksAdminPageSize;
      setOffset(newOffset);
      loadBooks(searchText, newOffset);
    }
  }, [hasMore, isLoading, isFetching, isRefreshing, offset, searchText]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOffset(0);
      loadBooks(searchText, 0, true);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchText]);

  return {
    data,
    isLoading,
    isFetching,
    isRefreshing,
    response,
    searchText,
    setSearchText,
    refresh,
    loadMore,
  };
};
