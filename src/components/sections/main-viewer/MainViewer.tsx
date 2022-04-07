import Header from "../header/Header";
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import classes from "./MainViewer.module.scss";
import { throttle } from "lodash";
import { GenericProps } from "../../../models/Application";
import { ScrollContext } from "../../../contexts";

const MainViewer = (props: GenericProps) => {
  const currentScrollY = useRef(0);
  const ref = useRef<HTMLDivElement>(null);
  const {setHeights, setMainViewerEl} = useContext(ScrollContext);
  const [opacity, setOpacity] = useState(0);
  const onScroll = (e: any) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    currentScrollY.current = scrollTop;

    setHeights(scrollTop, clientHeight, scrollHeight);
    const calculatedOpacity = currentScrollY.current / 150;
    const displayedOpacity = calculatedOpacity > 1 ? 1 : calculatedOpacity;
    if (opacity !== displayedOpacity) {
      setOpacity(displayedOpacity);
    }
  };

  useLayoutEffect(() => {
    if (ref.current) {
      setMainViewerEl(ref.current);
    }    
  }, [])

  const onScrollThrottled = throttle(onScroll, 100);

  return (
    <div className={classes["main-viewer"]} onScroll={onScrollThrottled} ref={ref}>
      <Header opacity={opacity} />
      <div className={classes["main-container"]}>{props.children}</div>
    </div>
  );
};

export default MainViewer;
