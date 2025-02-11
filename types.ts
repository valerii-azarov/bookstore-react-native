import { ImageSourcePropType } from "react-native";

export type Language = "en" | "uk";

export type FontWeight = "light" | "regular" | "medium" | "bold";

export type TabType = {
  name: string;
  label: string;
  icon: React.ReactElement;
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
