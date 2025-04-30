import { useCategoryBooksStore } from "@/stores/categoryBooksStore";

type CategoryBooksStoreType = ReturnType<typeof useCategoryBooksStore.getState>;

export const selectCurrentCategory = (state: CategoryBooksStoreType) => state.currentCategory;
export const selectCategoryBooks = (state: CategoryBooksStoreType) => state.categoryBooks;
export const selectCategoryLastDoc = (state: CategoryBooksStoreType) => state.categoryLastDoc;
export const selectCategoryStatus = (state: CategoryBooksStoreType) => state.categoryStatus;
export const selectCategoryResponse = (state: CategoryBooksStoreType) => state.categoryResponse;
export const selectCategoryHasMore = (state: CategoryBooksStoreType) => state.categoryHasMore;

export const selectSetCategory = (state: CategoryBooksStoreType) => state.setCategory;
export const selectLoadCategoryBooks = (state: CategoryBooksStoreType) => state.loadCategoryBooks;
export const selectLoadMoreCategoryBooks = (state: CategoryBooksStoreType) => state.loadMoreCategoryBooks;
export const selectRefreshCategoryBooks = (state: CategoryBooksStoreType) => state.refreshCategoryBooks;
export const selectResetCategory = (state: CategoryBooksStoreType) => state.resetCategory;
