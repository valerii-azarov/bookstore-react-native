import * as IconSets from "@expo/vector-icons";
import { QueryDocumentSnapshot, DocumentData } from "@firebase/firestore";

export type AppRoute = "/profile" | "/favorites" | "/viewing-history"; // | "/bonuses" | "/offers";

export type LanguageType = "en" | "uk";

export type ModeType = "list" | "grid" | "horizontal";

export type SizeType = "small" | "medium" | "large";

export type WeightType = "light" | "regular" | "medium" | "bold";

export type DirectionType = "forward" | "backward";

export type ResizeModeType = "cover" | "contain" | "stretch" | "center";

export type MessageType = "success" | "error";

export type ResponseType = {
  status: "success" | "error";
  message?: string;
};

export type StatusType = 
  | "idle"
  | "loading"
  | "fetching"
  | "refreshing"
  | "creating"
  | "updating"
  | "deleting";

export type AuthStatusType = 
  | "idle"
  | "initializing"
  | "fetching"
  | "registering"
  | "authenticating"
  | "loggingOut";

export type FavoriteStatusType = "idle" | "toggling";  

export type FieldType = "input" | "textarea";

export type ShapeType = "square" | "rounded";

// responses
export interface BooksResponse {
  books: BaseBook[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
}

export interface OrdersResponse {
  orders: Order[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
}

// option
export interface Option<T extends string> {
  label: string;
  value: T;
}

// user
export enum Role {
  User = 1,
  Admin = 2,
}

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

export type ProfileField = keyof Omit<BaseUser, "uid" | "email" | "role">;

// auth
export interface AuthFields {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type SignUpField = keyof AuthFields;

export interface SignUpFormValues extends AuthFields {}
export interface SignUpCreation extends Omit<AuthFields, "confirmPassword"> {}

export type SignInField = keyof Omit<AuthFields, "firstName" | "lastName" | "confirmPassword">;

export interface SignInFormValues extends Pick<AuthFields, "email" | "password"> {}
export interface SignInCredentials extends SignInFormValues {}

export interface PasswordVisibility {
  password: boolean;
  confirmPassword: boolean;
}

export interface PasswordValidations {
  length: boolean;
  uppercase: boolean;
  confirmMatch: boolean;
}

// book
export interface BaseBook {
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
}

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

export interface Images {
  coverImage: string;
  additionalImages: string[];
}

export interface Rates {
  originalPrice: number;
  discount: number;
  price: number;
}

export interface Cart extends BaseBook, CartEntry {}
export interface Favorite extends BaseBook, FavoriteEntry {}
export interface ViewingHistory extends BaseBook, ViewingHistoryEntry {}

export interface Book extends BaseBook, Partial<CartEntry>, Partial<FavoriteEntry> {}

export type BookField = keyof BaseBook;

export interface BookFormValues extends Omit<BaseBook, "id" | "createdAt" | "updatedAt"> {}
export interface BookCreation extends BookFormValues {}

export type EditableBookField =
  | Exclude<
      keyof BaseBook,
      | "id"
      | "originalPrice"
      | "discount"
      | "price"
      | "coverImage"
      | "additionalImages"
      | "createdAt"
      | "updatedAt"
    >
  | "rates"
  | "images";

export type EditableBookValue = string | string[] | number | boolean | Rates | Images;

// nova post
export interface BaseNovaPost {
  ref: string;
  description: string;
}

export interface NovaPostCity extends BaseNovaPost {}

export interface NovaPostWarehouse extends BaseNovaPost {
  cityRef: string;
}

// order
export type OrderStatusType = "processing" | "shipped" | "delivered" | "received";

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
  status: OrderStatusType;
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
  trackingNumber?: string;
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

// order history
export interface OrderHistoryByDate {
  date: string;
  orders: Order[];
}

// viewing history
export interface ViewingHistoryByDate {
  date: string;
  books: ViewingHistory[];
};

// others
export interface Step<T> {
  title: string;
  hideTitle?: boolean;
  hideStepCount?: boolean;
  useFullStepCount?: boolean;
  component: React.ReactNode;
  validate?: (form: T) => boolean;
  scrollEnabled?: boolean;
}

export interface IconType {
  iconSet: keyof typeof IconSets;
  iconName: string;
}

export interface TimelineType extends IconType {
  title: string;
  subtitle: string;
}

export interface TimelineStep<T> extends TimelineType {
  id?: string;
  completed: boolean;
  state: T;
}

export type TabType = {
  name: string;
  label: string;
  iconSet: keyof typeof IconSets;
  iconName: string;
};
