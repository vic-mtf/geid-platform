import { useState, useMemo, useCallback } from "react";
import capStr from "../utils/capStr";

export default function useScrollEnd(props = { type: "top", margin: 0 }) {
  const [atEnd, setAtEnd] = useState(true);
  const scrollEndOptions = useMemo(() => ({ isDispatch: true }), []);
  const scrollType = useMemo(
    () => (props?.type || "top").toLowerCase().trim(),
    [props?.type]
  );
  const type = useMemo(() => `scroll${capStr(scrollType)}`, [scrollType]);

  const onScroll = useCallback(
    (event) => {
      const root = event.target;
      if (atEnd && event.target[type] > 0) setAtEnd(false);
      if (!atEnd && event.target[type] === 0) setAtEnd(true);
      const down = root.scrollHeight - (root.scrollTop + root.offsetHeight);
      const up = root.scrollTop;
      const value = Math.round(Math.min(down, up));
      const { isDispatch } = scrollEndOptions;
      if (scrollType === "top" && value <= props.margin && isDispatch) {
        if (typeof props?.onScrollEnd === "function")
          props?.onScrollEnd(event, value === up ? "up" : "down");
        scrollEndOptions.isDispatch = false;
      }
      if (value > props.margin) scrollEndOptions.isDispatch = true;
    },
    [scrollType, atEnd, type, props, scrollEndOptions]
  );

  return [atEnd, { onScroll }];
}
