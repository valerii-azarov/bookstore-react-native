import { useCategoriesStore } from "@/stores/categoriesStore";

type CategoriesStoreType = ReturnType<typeof useCategoriesStore.getState>;

export const selectCategories = (state: CategoriesStoreType) => state.categories;
export const selectCategoriesStatus = (state: CategoriesStoreType) => state.categoriesStatus;
export const selectCategoriesResponse = (state: CategoriesStoreType) => state.categoriesResponse;

export const selectLoadCategories = (state: CategoriesStoreType) => state.loadCategories;
export const selectRefreshCategories = (state: CategoriesStoreType) => state.refreshCategories;
