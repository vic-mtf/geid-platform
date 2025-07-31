import { useCallback, useEffect, useState } from "react";

export default function useAutoMode() {
  const [mode, setMode] = useState(
    darkThemeMediaquery.matches ? "dark" : "light"
  );

  const handleChange = useCallback(
    (event) => setMode(event.target.matches ? "dark" : "light"),
    []
  );

  useEffect(() => {
    darkThemeMediaquery.addEventListener("change", handleChange);
    return () =>
      darkThemeMediaquery.removeEventListener("change", handleChange);
  }, [handleChange]);

  return mode;
}

const darkThemeMediaquery = window.matchMedia(`(prefers-color-scheme: dark)`);
