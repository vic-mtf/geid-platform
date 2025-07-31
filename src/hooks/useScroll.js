import { useCallback } from "react";
import { useState } from "react";

export default function useScroll() {
  const [showShadow, setShowShadow] = useState(false);

  const onScroll = useCallback(
    (event) => {
      const showing = Boolean(event.target.scrollTop);
      if (showing && !showShadow) setShowShadow(true);
      if (!showing && showShadow) setShowShadow(false);
    },
    [showShadow]
  );

  return [showShadow, onScroll];
}
