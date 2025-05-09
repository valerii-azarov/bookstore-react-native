import {
  integerInputRegex,
  decimalInputRegex,
  multipleDotRegex,
  multipleCommaRegex,
  extraDotAfterDecimalRegex
} from "@/constants/regex";

export const converter = {
  toNumericValue: (value: string): number | null => {
    return value === "" || isNaN(+value) ? null : +value;
  },
  
  formatNumericValue: (value: string, isInteger: boolean = false): string | undefined => {
    const cleanedValue = value.replace(isInteger ? integerInputRegex : decimalInputRegex, "");
    if (isInteger) return cleanedValue;

    const formattedValue = cleanedValue.replace(",", ".");
    if ((formattedValue.match(multipleDotRegex) || []).length > 1 || (cleanedValue.match(multipleCommaRegex) || []).length > 1) {
      return undefined;
    }

    return formattedValue.includes(".") ? formattedValue.replace(extraDotAfterDecimalRegex, "$1") : formattedValue;
  },
};
