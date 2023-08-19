"use client";

import { useEffect, useState } from "react";
import { throttle } from "../../utils/animation";
// @ts-ignore
import ArrowTopIcon from "../../public/images/arrow-top.svg";
import "../../styles/Components/topPageButton.scss";

export const TopPageButton = () => {
  const [isDisplay, setIsDisplay] = useState<boolean>(false);
  const classDisplayButton: string = "show";

  const handleScroll = () => {
    const scrolled = window.pageYOffset;
    const coords = document.documentElement.clientHeight;
    scrolled > coords ? setIsDisplay(true) : setIsDisplay(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", throttle(handleScroll, 300));
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button className={`top-page ${isDisplay ? classDisplayButton : ""}`} onClick={handleClick}>
      <ArrowTopIcon />
    </button>
  );
};
