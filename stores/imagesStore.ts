import { create } from "zustand";
import { imagesApi } from "@/api/imagesApi";
import { StatusType, ResponseType } from "@/types";

interface ImagesState {
  coverImages: string[];
  coverImagesStatus: StatusType;
  coverImagesResponse: ResponseType | null;
  loadCoverImages: () => Promise<void>;
  resetImages: () => void;
}

export const useImagesStore = create<ImagesState>((set, get) => ({
  coverImages: [],
  coverImagesStatus: "idle",
  coverImagesResponse: null,

  loadCoverImages: async () => {
    if (get().coverImages.length > 0) return;

    set({ coverImagesStatus: "loading", coverImagesResponse: null });

    imagesApi.getCoverImages()
      .then((images) => 
        set({
          coverImages: images,
          coverImagesResponse: { status: "success" },
          coverImagesStatus: "idle",
        })
      )
      .catch((error) => 
        set({
          coverImagesResponse: { status: "error", message: error.message },
          coverImagesStatus: "idle",
        })
      );
  },

  resetImages: () => {
    set({ 
      coverImages: [],
      coverImagesStatus: "idle",
      coverImagesResponse: null,
    });
  },
}));
