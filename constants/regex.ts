export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = /[A-Z0-9@$!%*?&#]/;

export const isbnRegex = /^(97[89][- ]?\d{1,5}[- ]?\d{1,7}[- ]?\d{1,7}[- ]?\d)$/;

export const integerInputRegex = /[^0-9]/g;
export const decimalInputRegex = /[^0-9.,]/g;
export const multipleDotRegex = /\./g;
export const multipleCommaRegex = /,/g;
export const extraDotAfterDecimalRegex = /(\..*)\./g;

export const trackingNumberRegex = /^\d{14}$/;
