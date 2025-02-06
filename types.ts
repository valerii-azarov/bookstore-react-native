import { ImageSourcePropType } from "react-native";

export type Language = "en" | "uk";

export type FontWeight = "light" | "regular" | "medium" | "bold";

export interface ImageBook {
  id: string;
  source: ImageSourcePropType;
}

export interface ImageFlag {
  id: string;
  lang: Language;
  source: ImageSourcePropType;
}

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
