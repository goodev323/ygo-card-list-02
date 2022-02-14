import { useCallback, useEffect, useRef } from "react";

export const useScrollBottomListener = (
  onBottom: () => void,
  displayableHeight: number
) => {
  const containerRef = useRef<HTMLElement>(null);

  const handleOnScroll = useCallback(() => {
    const { pageYOffset, innerHeight } = window;
    const scrollHeight = containerRef.current?.scrollHeight || 0;
    if (scrollHeight < displayableHeight) {
      return;
    }
    if (innerHeight - (scrollHeight - pageYOffset) >= 80) {
      onBottom();
    }
  }, [onBottom, containerRef.current, displayableHeight]);

  useEffect(() => {
    window.addEventListener("scroll", handleOnScroll);
    handleOnScroll();
    return () => window.removeEventListener("scroll", handleOnScroll);
  }, [handleOnScroll]);

  return containerRef;
};
