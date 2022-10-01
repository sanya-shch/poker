import React, { useEffect, useRef } from "react";

import "./style.scss";

const MainButton = ({ text, onClick }) => {
  const element = useRef(null);
  const spanElement = useRef(null);

  useEffect(() => {
    const mouseenter = (e) => {
      if (element?.current) {
        spanElement.current.style.top = `${e.offsetY}px`;
        spanElement.current.style.left = `${e.offsetX}px`;
      }
    };
    const mouseout = (e) => {
      if (element?.current) {
        spanElement.current.style.top = `${e.offsetY}px`;
        spanElement.current.style.left = `${e.offsetX}px`;
      }
    };

    if (element?.current) {
      element.current.addEventListener("mouseenter", mouseenter);
      element.current.addEventListener("mouseleave", mouseout);
    }

    return () => {
      if (element?.current) {
        element.current.removeEventListener("mouseenter", mouseenter);
        element.current.removeEventListener("mouseleave", mouseout);
      }
    };
  }, [element]);

  return (
    <button ref={element} className="main_button" onClick={onClick}>
      <span className="text">{text}</span>
      <span ref={spanElement} className="focus-bg" />
    </button>
  );
};

export default MainButton;
