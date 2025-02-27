export const colorConverter = {
  hexToRgb(hex: string): { r: number; g: number; b: number } {
    hex = hex.replace(/^#/, "");
    if (!/^[0-9A-Fa-f]{3,6}$/.test(hex)) throw new Error("Invalid HEX color format");

    if (hex.length === 3) hex = hex.replace(/./g, (c) => c + c);

    const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
    return { r, g, b };
  },

  rgbToHex({ r, g, b }: { r: number; g: number; b: number }): string {
    return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
  },

  getBrightness({ r, g, b }: { r: number; g: number; b: number }): number {
    return (r * 299 + g * 587 + b * 114) / 1000;
  },

  dominantHexColor(colors: string[], isBrightest: boolean = true): string {
    if (!colors.length) throw new Error("Color array cannot be empty");

    return this.rgbToHex(
      colors
        .map(this.hexToRgb)
        .reduce((max, cur) => 
          (this.getBrightness(cur) > this.getBrightness(max) === isBrightest ? cur : max)
        )
    );
  },

  adjustHexColor(hex: string, factor: number): string {
    const { r, g, b } = this.hexToRgb(hex);
    return this.rgbToHex({
      r: Math.min(255, Math.round(r * factor)),
      g: Math.min(255, Math.round(g * factor)),
      b: Math.min(255, Math.round(b * factor)),
    });
  },

 darkerHexColor(hex: string | undefined, factor: number = 0.6): string {
    if (!hex) throw new Error("HEX color is undefined");
    if (factor <= 0 || factor >= 1) throw new Error("Factor for darker color must be between 0 and 1");
    return this.adjustHexColor(hex, factor);
  },

  lighterHexColor(hex: string | undefined, factor: number = 1.4): string {
    if (!hex) throw new Error("HEX color is undefined");
    if (factor <= 1 || factor > 2) throw new Error("Factor for lighter color must be between 1 and 2");
    return this.adjustHexColor(hex, factor);
  },
};
