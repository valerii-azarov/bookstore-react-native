import { CartBook } from "@/types";

export const cartHandler = {
  calculatePrice: (book: CartBook): number => {
    const basePrice = book.originalPrice;
    const discountedPrice = book.discount > 0 ? basePrice * (1 - book.discount / 100) : basePrice;
    
    return book.price === discountedPrice ? book.price : discountedPrice;
  },
};
