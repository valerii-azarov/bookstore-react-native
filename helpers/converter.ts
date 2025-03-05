export const converter = {
  toNumericValue: (value: string): number | null => {
    return value === "" || isNaN(+value) ? null : +value;
  },
  
  numericInput: (value: string, isInteger: boolean = false): string | undefined => {
    const cleanedValue = value.replace(isInteger ? /[^0-9]/g : /[^0-9.,]/g, "");
    if (isInteger) return cleanedValue;

    const formattedValue = cleanedValue.replace(",", ".");
    if ((formattedValue.match(/\./g) || []).length > 1 || (cleanedValue.match(/,/g) || []).length > 1) {
      return undefined;
    }

    return formattedValue.includes(".") ? formattedValue.replace(/(\..*)\./g, "$1") : formattedValue;
  },
};
