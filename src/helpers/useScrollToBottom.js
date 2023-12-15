import React, { useRef } from "react";

export default function useScrollToBottom(container, callback, offset) {
  const callbackRef = useRef();

  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  React.useEffect(() => {
    if (!container) return;

    const handleScroll = () => {
      let scrollContainer =
        container === document ? document.scrollingElement : container;
      if (
        scrollContainer.scrollTop + scrollContainer.clientHeight >=
        scrollContainer.scrollHeight - offset
      ) {
        callbackRef.current();
      }
    };
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeAddEventListener("scroll", handleScroll);
    };
  }, [offset, container]);
}
