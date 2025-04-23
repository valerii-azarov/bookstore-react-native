import { useSearchedBooksStore } from "@/stores/searchedBooksStore";

type SearchedBooksStoreType = ReturnType<typeof useSearchedBooksStore.getState>;

export const selectSearchedBooks = (state: SearchedBooksStoreType) => state.searchedBooks;
export const selectSearchedBooksLastDoc = (state: SearchedBooksStoreType) => state.searchedBooksLastDoc;
export const selectSearchedBooksStatus = (state: SearchedBooksStoreType) => state.searchedBooksStatus;
export const selectSearchedBooksResponse = (state: SearchedBooksStoreType) => state.searchedBooksResponse;
export const selectSearchedBooksHasMore = (state: SearchedBooksStoreType) => state.searchedBooksHasMore;
export const selectSearchQuery = (state: SearchedBooksStoreType) => state.searchQuery;
export const selectSearchKeys = (state: SearchedBooksStoreType) => state.searchKeys;

export const selectSetSearchQuery = (state: SearchedBooksStoreType) => state.setSearchQuery;
export const selectLoadSearchedBooks = (state: SearchedBooksStoreType) => state.loadSearchedBooks;
export const selectLoadMoreSearchedBooks = (state: SearchedBooksStoreType) => state.loadMoreSearchedBooks;
export const selectRefreshSearchedBooks = (state: SearchedBooksStoreType) => state.refreshSearchedBooks;
export const selectResetAll = (state: SearchedBooksStoreType) => state.resetAll;
