import { useState, useEffect, useCallback } from "react";

export const useScroll = () => {
  //   useEffect(() => {
  //     // set scroll to zero when component did mount
  //     window.scrollTo(0, 0);
  //     console.log("umad");
  // }, []);
  const [state, setState] = useState({
    lastScrollTop: 0,
    bodyOffset: document.body.getBoundingClientRect(),
    scrollY: document.body.getBoundingClientRect().top,
    scrollX: document.body.getBoundingClientRect().left,
    scrollDirection: "", // down, up
  });

  const handleScrollEvent = useCallback((e) => {
    setState((prevState) => {
      const prevLastScrollTop = prevState.lastScrollTop;
      const bodyOffset = document.body.getBoundingClientRect();

      return {
        setBodyOffset: bodyOffset,
        scrollY: -bodyOffset.top,
        scrollX: bodyOffset.left,
        scrollDirection: prevLastScrollTop > -bodyOffset.top ? "down" : "up",
        lastScrollTop: -bodyOffset.top,
      };
    });
  }, []);

  useEffect(() => {
    const scrollListener = (e) => {
      handleScrollEvent(e);
    };
    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, [handleScrollEvent]);

  return {
    scrollY: state.scrollY,
    scrollX: state.scrollX,
    scrollDirection: state.scrollDirection,
  };
};

export default useScroll;
