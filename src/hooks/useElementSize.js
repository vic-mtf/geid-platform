import { useState, useRef, useLayoutEffect } from "react";

const useElementSize = (contentReady = true) => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current || !contentReady) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const { width, height } = entry.contentRect;
        setSize((prev) =>
          prev.width !== width || prev.height !== height
            ? { width, height }
            : prev
        );
      }
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [contentReady]);

  return [ref, size];
};

export default useElementSize;
