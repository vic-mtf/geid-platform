export default function humanReadableSize(
  sizeInBytes = 0,
  unit = 1024,
  fixed = 2
) {
  const units = ["o", "K", "M", "G", "T", "P", "E", "Z", "Y"];
  let i = 0;
  while (sizeInBytes >= unit) {
    sizeInBytes /= unit;
    i++;
  }
  return sizeInBytes.toFixed(fixed) + " " + units[i];
}
