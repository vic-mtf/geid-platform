export default function getPathnames(input) {
  const paths = input.startsWith("http") ? new URL(input).pathname : input;
  return paths.split("/").filter(Boolean);
}
