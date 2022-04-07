import React, { useCallback, useEffect, useRef, useState } from "react";
import { GenericProps } from "../models/Application";

interface ScrollContext {
  scrollToTop: () => void;
  isScrolledToBottom: boolean;
  setHeights: (
    scrollTop: number,
    clientHeight: number,
    scrollHeight: number
  ) => void;
  setMainViewerEl: (element: HTMLDivElement) => void;
}
export const ScrollContext = React.createContext<ScrollContext>({
  scrollToTop: () => {},
  isScrolledToBottom: false,
  setHeights: (
    scrollTop: number,
    clientHeight: number,
    scrollHeight: number
  ) => {},
  setMainViewerEl: (element: HTMLDivElement) => {},
});

export const ScrollProvider = ({ children }: GenericProps) => {
  const [mainViewerEl, setMainViewerEl] = useState<HTMLDivElement | null>(null);
  const prevIsScrolledToBottom = useRef(false);
  const [heights, setHeights] = useState({
    clientHeight: 0,
    scrollHeight: 0,
    scrollTop: 0,
  });
  const [isScrolledToBottom, setIsScrolledToBottom] = useState<boolean>(false);
  const scrollToTop = useCallback(() => {
    mainViewerEl?.scrollTo(0, 0);
  }, [mainViewerEl])

  useEffect(() => {
      const {clientHeight, scrollHeight, scrollTop} = heights;
      if (clientHeight && scrollHeight) {
        const isReachedBottom = clientHeight + scrollTop === scrollHeight;
        if (isReachedBottom && !prevIsScrolledToBottom.current && scrollTop) {
          prevIsScrolledToBottom.current = true;
          setIsScrolledToBottom(true);
        }
  
        if (!isReachedBottom && prevIsScrolledToBottom.current) {
          prevIsScrolledToBottom.current = false;
          setIsScrolledToBottom(false);
        }
      }
  }, [heights]);

  return (
    <ScrollContext.Provider
      value={{
        setMainViewerEl,
        scrollToTop,
        isScrolledToBottom,
        setHeights: (
          scrollTop: number,
          clientHeight: number,
          scrollHeight: number
        ) => {
          setHeights({
            clientHeight,
            scrollHeight,
            scrollTop,
          });
        },
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

export default ScrollProvider;
