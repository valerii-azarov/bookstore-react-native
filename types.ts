import { ImageSourcePropType } from "react-native";
import * as IconSets from "@expo/vector-icons";
import { QueryDocumentSnapshot, DocumentData } from "@firebase/firestore";

// route 
export type AppRoute = "/profile" | "/favorites" | "/viewing-history";
// type AppRoute = "/profile" | "/favorites" | "/viewing-history" | "/bonuses" | "/offers";

// lang
export type Language = "en" | "uk";

// fonts
export type FontWeight = "light" | "regular" | "medium" | "bold";

// tab
export type TabType = {
  name: string;
  label: string;
  icon: React.ReactElement;
};

// this needs to be removed
export type OptionType = {
  label: string;
  value: string;
};

// new option for test
export interface Option<T extends string> {
  label: string;
  value: T;
}

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

// role
export enum Role {
  User = 1,
  Admin = 2,
}

// user
export interface BaseUser {
  uid?: string;
  firstName: string;
  lastName: string;
  email?: string;
  role?: Role;
};

export interface User extends BaseUser {
  favorites: string[];
  viewingHistory: { bookId?: string; timestamp: Date; }[];
  orders: string[];
};

// auth fields
export interface SignUpFields {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
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

export type SignInField = keyof Omit<SignUpFields, "firstName" | "lastName" | "confirmPassword">;

export type SignInFields = Pick<SignUpFields, "email" | "password">;

// profile fields
export type ProfileField = keyof Omit<BaseUser, "uid" | "email" | "role">;

// menu
export interface MenuItem {
  key: string;
  label: string;
  iconSet: keyof typeof IconSets;
  iconName: string;
  iconSize?: number;
  iconColor?: string;
  textColor?: string;
  route?: AppRoute;
  onPress?: () => void;
  component?: React.ReactNode;
  hideChevron?: boolean;
  isVisible?: boolean;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

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

export interface CartEntry {
  inCart: boolean;
  cartQuantity: number;
}

export interface FavoriteEntry {
  isFavorite: boolean;
}

export interface ViewingHistoryEntry {
  bookId?: string;
  timestamp: Date;
}

export type Cart = BaseBook & CartEntry;

export type Favorite = BaseBook & FavoriteEntry;

export type ViewingHistory = BaseBook & ViewingHistoryEntry;

export type Book = BaseBook & Partial<Cart & Favorite>;

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

// nova post
export interface BaseNovaPost {
  ref: string;
  description: string;
}

export interface NovaPostCity extends BaseNovaPost {}

export interface NovaPostWarehouse extends BaseNovaPost {
  cityRef: string;
}

// icon
export type IconType = {
  iconSet: keyof typeof IconSets;
  iconName: string;
}

// timeline
export type TimelineType = IconType & {
  title: string;
  subtitle: string;
}

export interface TimelineStep<T> extends TimelineType {
  id?: string;
  completed: boolean;
  state: T;
}

// order
export type OrderStateType = "processing" | "shipped" | "delivered" | "received";

export interface OrderStatusStyle {
  label: string;
  backgroundColor: string;
}

export interface Order {
  id: string;
  userId: string;
  books: { 
    bookId: string;
    title: string;
    authors: string[];
    quantity: number;
    price: number;
    originalPrice: number;
    coverImage: string;
  }[];
  status: OrderStateType;
  paymentMethod: string;
  isPaid: boolean;
  customer: {
    firstName: string;
    lastName: string;
    middleName?: string;
    phoneNumber: string;
  };
  delivery: {
    city: string;
    warehouse: string;
  };
  subtotal: number;
  discountAmount: number;
  total: number;
  receiptId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderReceipt {
  id: string;
  userId: string;
  orderId: string;
  books: { 
    title: string; 
    quantity: number; 
    price: number;
    originalPrice: number;
    total: number;
  }[];
  subtotal: number;
  discountAmount: number;
  total: number;
  paymentMethod: string;
  createdAt: Date;
}

export interface OrderFormValues {
  city: string;
  warehouse: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  phoneNumber: string;
  paymentMethod: string;
}

export interface OrderCreation extends Omit<Order, "id" | "userId" | "createdAt" | "updatedAt"> {}

export interface OrderReceiptCreation extends Omit<OrderReceipt, "id" | "userId" | "orderId" | "createdAt"> {}

// histories
export interface OrderHistoryByDate {
  date: string;
  orders: Order[];
}

export interface ViewingHistoryByDate {
  date: string;
  books: ViewingHistory[];
};

// components
export interface Step<T> {
  title: string;
  hideTitle?: boolean;
  hideStepCount?: boolean;
  useFullStepCount?: boolean;
  component: React.ReactNode;
  validate?: (form: T) => boolean;
  scrollEnabled?: boolean;
}

export type BookFieldComponentType = {
  component: JSX.Element;
};

export type EditableBookFields = Partial<Record<EditableBookField, BookFieldComponentType>>;

export type BookStepComponentType = {
  title: string;
  component: JSX.Element;
  validate?: (form: CreateBook) => boolean;
};

// other responses
export type BooksResponse = {
  books: BaseBook[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
};

export type OrdersResponse = {
  orders: Order[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
};

// categories
export type CategoriesType = { [key: string]: Book[] };

// auth status
export type AuthStatusType = 
  | "idle"
  | "initializing"
  | "fetching"
  | "registering"
  | "authenticating"
  | "loggingOut";

// new status for test
export type StatusType = 
  | "idle"
  | "loading"
  | "fetching"
  | "refreshing"
  | "creating"
  | "updating"
  | "deleting";

// favorite status
export type FavoriteStatusType = "idle" | "toggling";

// others
export type BookSearchKey = keyof BaseBook;

export type ModeType = "list" | "grid" | "horizontal";

export type HeightType = "small" | "medium" | "large";

export type DirectionType = "forward" | "backward";
