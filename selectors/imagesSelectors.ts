import { useImagesStore } from "@/stores/imagesStore";

type ImagesStoreType = ReturnType<typeof useImagesStore.getState>;

export const selectCoverImages = (state: ImagesStoreType) => state.coverImages;
export const selectCoverImagesStatus = (state: ImagesStoreType) => state.coverImagesStatus;
export const selectCoverImagesResponse = (state: ImagesStoreType) => state.coverImagesResponse;

export const selectLoadCoverImages = (state: ImagesStoreType) => state.loadCoverImages;
export const selectResetImages = (state: ImagesStoreType) => state.resetImages;
