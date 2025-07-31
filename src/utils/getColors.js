export default function getColors(color) {
  let r, g, b;

  if (color[0] === "#") {
    if (color.length === 4) {
      r = parseInt(color[1] + color[1], 16);
      g = parseInt(color[2] + color[2], 16);
      b = parseInt(color[3] + color[3], 16);
    } else {
      r = parseInt(color.slice(1, 3), 16);
      g = parseInt(color.slice(3, 5), 16);
      b = parseInt(color.slice(5), 16);
    }
  } else if (color.slice(0, 3) === "rgb") {
    const rgbValues = color.slice(4, -1).split(",");
    r = parseInt(rgbValues[0]);
    g = parseInt(rgbValues[1]);
    b = parseInt(rgbValues[2]);
  } else {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const [rArr, gArr, bArr] = ctx.getImageData(0, 0, 1, 1).data;
    r = rArr;
    g = gArr;
    b = bArr;
  }
  return `${r}, ${g}, ${b}`;
}
