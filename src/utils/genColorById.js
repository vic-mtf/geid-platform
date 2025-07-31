export default function getHueColorById(_id = "") {
  const id = _id?.toString(16);
  const len = id?.length;
  const middle = Math.round(len / 2);
  let red = id.slice(0, 2).split("").reverse().join("");
  let green = id.slice(middle - 1, middle + 1);
  let blue = id.slice(-2).split("").reverse().join("");
  red = parseInt(red, 16);
  green = parseInt(green, 16);
  blue = parseInt(blue, 16);
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const d = (max - min) / 255;
  const lightness = (max + min) / (2 * 255);
  const saturation = lightness > 0 ? d / (1 - Math.abs(2 * lightness - 1)) : 0;
  let angle = Math.acos(
    (red - green / 2 - blue / 2) /
      Math.sqrt(
        red ** 2 +
          green ** 2 +
          blue ** 2 -
          red * green -
          red * blue -
          green * blue
      )
  );
  angle = green >= blue ? angle : 360 - angle;

  return {
    hsl: { h: angle, s: saturation, l: lightness },
    rgb: { r: red, g: green, b: blue },
  };
}

export function generateColorsFromId(id, theme = "light") {
  const num = parseInt(id?.toString()?.substr(-6), 16);
  let lightness;
  if (theme === "light") {
    lightness = 70;
  } else {
    lightness = 30;
  }
  const colorLight = `hsl(${num % 360}, 100%, ${lightness}%)`;
  const colorDark = `hsl(${num % 360}, 100%, ${lightness - 30}%)`;
  return {
    background: colorLight,
    text: colorDark,
  };
}
