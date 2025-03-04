import { ImageSourcePropType } from "react-native";

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

export type CreateBookType = {
  title: string;
  authors: string[];
  description: string;
  genres: string[];
  language: string;
  publisher: string;
  publicationYear: string;
  isbn: string;
  pageCount: string;
  coverType: string;
  bookType: string;
  paperType: string;
  size: string;
  weight: string;
  illustrations: boolean;
  coverImage: string | null;
  price: string;
  sku: string;
};

export type DirectionType = "forward" | "backward";

export type BookType = {
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
  coverType: "soft" | "hard";
  bookType: "paper" | "digital";
  paperType: "offset" | "coated" | "newsprint";
  size: string;
  weight: number;
  illustrations: boolean;
  quantity: number;
  sku: string;
  createdAt: Date;
  updatedAt: Date;
};

export type BookPriceType = {
  price: number;
  originalPrice?: number;
  discount?: number;
};

export type BoookImagesType = {
  coverImage: string;
  additionalImages: string[];
};

export type EditBookFieldType =
  | keyof Omit<BookType, "price" | "originalPrice" | "discount" | "coverImage" | "additionalImages" | "createdAt" | "updatedAt">
  | "images"
  | "pricing";

export type EditBookValueType = string | string[] | number | boolean | BookPriceType | BoookImagesType | null;

export type SearchKey = keyof BookType;

export type ModeType = "list" | "grid" | "horizontal";

export type HeightType = "small" | "medium" | "large";
