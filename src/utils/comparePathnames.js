export function comparePathnames(pathname1, pathname2) {
  const trimmedPathname1 = pathname1.replace(/^\/+|\/+$/g, "");
  const trimmedPathname2 = pathname2.replace(/^\/+|\/+$/g, "");
  return trimmedPathname1.toLowerCase() === trimmedPathname2.toLowerCase();
}
