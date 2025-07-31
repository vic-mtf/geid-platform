import { useEffect, useState } from "react";

export default function useOnLine() {
  const [onLine, setOnLine] = useState(window.navigator.onLine);

  useEffect(() => {
    const handleChangeState = () => setOnLine(window.navigator.onLine);
    window.addEventListener("online", handleChangeState);
    window.addEventListener("offline", handleChangeState);
    return () => {
      window.removeEventListener("online", handleChangeState);
      window.removeEventListener("offline", handleChangeState);
    };
  }, [setOnLine]);
  return onLine;
}
