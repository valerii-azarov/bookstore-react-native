import { useFavoritesStore } from "@/stores/favoritesStore";

type FavoritesStoreType = ReturnType<typeof useFavoritesStore.getState>;

export const selectFavoriteIds = (state: FavoritesStoreType) => state.favoriteIds;
export const selectFavoriteBooks = (state: FavoritesStoreType) => state.favoriteBooks;
export const selectFavoriteStatus = (state: FavoritesStoreType) => state.favoriteStatus;
export const selectFavoriteResponse = (state: FavoritesStoreType) => state.favoriteResponse;

export const selectToggleFavoriteStatus = (state: FavoritesStoreType) => state.toggleFavoriteStatus;
export const selectToggleFavoriteResponse = (state: FavoritesStoreType) => state.toggleFavoriteResponse;

export const selectSetFavoriteIds = (state: FavoritesStoreType) => state.setFavoriteIds;
export const selectLoadFavoriteBooks = (state: FavoritesStoreType) => state.loadFavoriteBooks;
export const selectToggleFavorite = (state: FavoritesStoreType) => state.toggleFavorite;
export const selectResetFavorites = (state: FavoritesStoreType) => state.resetFavorites;
