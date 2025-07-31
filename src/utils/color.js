export function hexToRgb(hex) {
  hex = hex.slice(1);

  let r = parseInt(hex.slice(0, 2), 16);
  let g = parseInt(hex.slice(2, 4), 16);
  let b = parseInt(hex.slice(4, 6), 16);

  return { r, g, b };
}

export function rgbToHex(r, g, b) {
  let rHex = r.toString(16).padStart(2, "0");
  let gHex = g.toString(16).padStart(2, "0");
  let bHex = b.toString(16).padStart(2, "0");

  let hex = "#" + rHex + gHex + bHex;

  return hex;
}

export function paleColor(color, theme) {
  let rgb;

  if (typeof color === "string" && color.startsWith("#")) rgb = hexToRgb(color);
  else if (
    typeof color === "object" &&
    color.r !== undefined &&
    color.g !== undefined &&
    color.b !== undefined
  )
    rgb = { ...color };

  let factor;

  if (theme === "dark") factor = 0.2;
  else if (theme === "light") factor = 0.8;

  rgb.r = Math.round(rgb.r * factor);
  rgb.g = Math.round(rgb.g * factor);
  rgb.b = Math.round(rgb.b * factor);

  let hex = rgbToHex(rgb.r, rgb.g, rgb.b);

  return hex;
}

export function colorFromId(id, mode = "light") {
  const num = parseInt(id?.toString()?.substr(-6), 16);
  let lightness = mode === "light" ? 70 : 30;
  return {
    backgroundColor: `hsl(${num % 360}, 100%, ${lightness}%)`,
    color: `hsl(${num % 360}, 100%, ${lightness - 30}%)`,
  };
}
