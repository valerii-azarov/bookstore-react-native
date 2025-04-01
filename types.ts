import { ImageSourcePropType } from "react-native";
import { QueryDocumentSnapshot, DocumentData } from "@firebase/firestore";

export type Language = "en" | "uk";

export type FontWeight = "light" | "regular" | "medium" | "bold";

export type TabType = {
  name: string;
  label: string;
  icon: React.ReactElement;
};

export type OptionType = {
  label: string;
  value: string;
};

export interface ImageBook {
  id: string;
  source: ImageSourcePropType;
}

export interface ImageFlag {
  id: string;
  lang: Language;
  source: ImageSourcePropType;
}

export type ResponseType = {
  status: "success" | "error";
  message?: string;
};

export enum Role {
  User = 1,
  Admin = 2,
}

export type UserType = {
  uid?: string;
  firstName: string;
  lastName: string;
  email?: string;
  role?: Role;
};

export interface SignInForm {
  email: string;
  password: string;
}

export interface SignInErrors {
  email: string | null;
  password: string | null;
}

export interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpErrors {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
}

export interface SignUpVisibility {
  password: boolean;
  confirmPassword: boolean;
}

export interface SignUpValidations {
  length: boolean;
  uppercase: boolean;
  confirmMatch: boolean;
}

export type MenuOptionsType = {
  title: string;
  icon: React.ReactElement;
  route: any;
  isVisible?: boolean;
};

export type EditFieldType = {
  firstName: string;
  lastName: string;
};

export type ProfileFieldType = {
  label: string;
  value: string;
  field: keyof UserType;
  editable: boolean;
};

// book fields
export type BaseBook = {
  id: string;
  title: string;
  authors: string[];
  price: number;
  originalPrice: number;
  discount: number;
  coverImage: string;
  additionalImages: string[];
  backgroundColor: string;
  description: string;
  genres: string[];
  language: string;
  publisher: string;
  publicationYear: number;
  isbn: string;
  pageCount: number;
  coverType: string;
  bookType: string;
  paperType: string;
  size: string;
  weight: number;
  illustrations: boolean;
  availableQuantity: number;
  sku: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Cart = {
  inCart: boolean;
  cartQuantity: number;
};

export type Favorite = {
  isFavorite: boolean;
};

export type ViewingHistory = {
  bookId?: string; 
  timestamp: Date;
};

export type CartBook = BaseBook & Cart;

export type FavoriteBook = BaseBook & Favorite;

export type ViewingHistoryBook = BaseBook & ViewingHistory;

export type Book = BaseBook & Partial<Favorite & Cart>;

export type BookPricing = {
  price: number;
  originalPrice?: number;
  discount?: number;
};

export type BoookImages = {
  coverImage: string;
  additionalImages: string[];
};

export type CreateBook = Omit<BaseBook, "id" | "createdAt" | "updatedAt">;

export type EditableBookField =
  | keyof Omit<BaseBook, "price" | "originalPrice" | "discount" | "coverImage" | "additionalImages" | "createdAt" | "updatedAt">
  | "images"
  | "pricing";

export type EditableBookValueType = string | string[] | number | boolean | BookPricing | BoookImages | null;

// components
export type BookFieldComponentType = {
  component: JSX.Element;
};

export type EditableBookFields = Partial<Record<EditableBookField, BookFieldComponentType>>;

export type BookStepComponentType = {
  title: string;
  component: JSX.Element;
  validate?: (form: CreateBook) => boolean;
};

// book responses
export type BooksResponse = {
  books: BaseBook[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
};

// categories
export type CategoriesType = { [key: string]: Book[] };

// statuses
export type BooksStatusType = "idle" | "loading" | "fetching" | "refreshing";

export type BookStatusType = "idle" | "loading" | "creating" | "updating" | "deleting";

export type CategoriesStatusType = "idle" | "loading" | "refreshing";

export type CategoryStatusType = "idle" | "loading" | "fetching" | "refreshing";

export type FavoritesStatusType = "idle" | "loading";

export type ToggleFavoriteStatusType = "idle" | "toggling";

export type ViewingHistoryStatusType = "idle" | "loading";

// others
export type BookSearchKey = keyof BaseBook;

export type ModeType = "list" | "grid" | "horizontal";

export type HeightType = "small" | "medium" | "large";

export type DirectionType = "forward" | "backward";
