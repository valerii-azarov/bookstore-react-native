import { CreateBookType } from "@/types";

export const validationRules: Record<number, Array<(form: CreateBookType) => boolean>> = {
  0: [
    (form) => form.title.trim() !== "",
  ],
  1: [
    (form) => form.authors.length > 0,
  ],
  2: [
    (form) => form.description.trim() !== "",
  ],
  3: [
    (form) => form.genres.length > 0,
  ],
  4: [
    (form) => form.language.trim() !== "",
  ],
  5: [
    (form) => form.publisher.trim() !== "",
  ],
  6: [
    (form) => form.publicationYear.trim() !== "",
  ],
  7: [
    (form) => form.isbn.trim() !== "",
  ],
  8: [
    (form) => form.pageCount.trim() !== "",
  ],
  9: [
    (form) => form.coverType.trim() !== "",
  ],
  10: [
    (form) => form.bookType.trim() !== "",
  ],
  11: [
    (form) => form.paperType.trim() !== "",
  ],
  12: [
    (form) => form.size.trim() !== "",
  ],
  13: [
    (form) => form.weight.trim() !== "",
  ],
  14: [
    (form) => form.illustrations !== undefined,
  ],
  15: [
    (form) => form.coverImage !== null && typeof form.coverImage === 'string' && form.coverImage.trim() !== "",
  ],
  16: [
    (form) => form.price.trim() !== "",
  ],
  17: [
    (form) => form.sku.trim() !== "",
  ],
};