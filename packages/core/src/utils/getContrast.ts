type GetContrast = (hexColor?: string) => "black" | "white" | undefined;

/**
 * @see https://gomakethings.com/dynamically-changing-the-text-color-based-on-background-color-contrast-with-vanilla-js/
 */
export const getContrast: GetContrast = (hexColor) => {
  if (!hexColor) return;
  // If a leading # is provided, remove it
  if (hexColor.slice(0, 1) === "#") {
    hexColor = hexColor.slice(1);
  }

  // Convert to RGB value
  let r: number;
  let g: number;
  let b: number;
  if (hexColor.length === 3) {
    r = parseInt(hexColor[0].repeat(2), 16);
    g = parseInt(hexColor[1].repeat(2), 16);
    b = parseInt(hexColor[2].repeat(2), 16);
  } else {
    r = parseInt(hexColor.slice(0, 2), 16);
    g = parseInt(hexColor.slice(2, 4), 16);
    b = parseInt(hexColor.slice(4, 6), 16);
  }

  // Get YIQ ratio
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  // Check contrast
  return yiq >= 128 ? "black" : "white";
};
