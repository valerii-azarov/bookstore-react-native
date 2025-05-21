import { useFavoritesStore } from "@/stores/favoritesStore";

type FavoritesStoreType = ReturnType<typeof useFavoritesStore.getState>;

export const selectFavoriteIds = (state: FavoritesStoreType) => state.favoriteIds;
export const selectFavoriteBooks = (state: FavoritesStoreType) => state.favoriteBooks;
export const selectFetchFavoritesStatus = (state: FavoritesStoreType) => state.favoritesOperations.fetch.status;
export const selectFetchFavoritesResponse = (state: FavoritesStoreType) => state.favoritesOperations.fetch.response;
export const selectToggleFavoriteStatus = (state: FavoritesStoreType) => state.favoritesOperations.toggle.status;
export const selectToggleFavoriteResponse = (state: FavoritesStoreType) => state.favoritesOperations.toggle.response;
export const selectFavoritesDataLoaded = (state: FavoritesStoreType) => state.favoritesDataLoaded;

export const selectInitializeFavorites = (state: FavoritesStoreType) => state.initializeFavorites;
export const selectLoadFavoriteBooks = (state: FavoritesStoreType) => state.loadFavoriteBooks;
export const selectToggleFavorite = (state: FavoritesStoreType) => state.toggleFavorite;
export const selectSetFavoritesOperationState = (state: FavoritesStoreType) => state.setFavoritesOperationState;
export const selectResetFavoritesOperationState = (state: FavoritesStoreType) => state.resetFavoritesOperationState;
export const selectResetFavorites = (state: FavoritesStoreType) => state.resetFavorites;
export const selectResetAll = (state: FavoritesStoreType) => state.resetAll;
