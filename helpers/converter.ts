export const converter = {
  toNumericValue: (value: string): number | null => {
    return value === "" || isNaN(+value) ? null : +value;
  },
};
