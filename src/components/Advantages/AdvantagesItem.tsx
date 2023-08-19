"use client";

import { ReactElement, useEffect, useRef, useState } from "react";
import { TypeAdvantagesObjects } from "./Advantages";
// @ts-ignore
import WatchIcon from "../../public/images/advantages/award.svg";
// @ts-ignore
import SearchIcon from "../../public/images/advantages/eye.svg";
// @ts-ignore
import FavoriteIcon from "../../public/images/advantages/favorite.svg";
// @ts-ignore
import PremieresIcon from "../../public/images/advantages/watch.svg";

type TypeAdvantagesItem = { id: number; data: TypeAdvantagesObjects };
type TypeStyleTransform = { transform: string };
type TypeListImages = { [key: string]: ReactElement };

const listImages: TypeListImages = {
  bests: <WatchIcon />,
  search: <SearchIcon />,
  favorite: <FavoriteIcon />,
  premieres: <PremieresIcon />,
};

export const AdvantagesItem = ({ id, data }: TypeAdvantagesItem) => {
  const [show, setShow] = useState<boolean>(false);
  const [showImg, setShowImg] = useState<boolean>(false);
  const [percentShown, setPercentShow] = useState<number>(0);
  const [styleTransform, setStyleTransform] = useState<TypeStyleTransform>({
    transform: "translateX(-100vw)",
  });
  const itemRef = useRef<HTMLDivElement | null>(null);
  const { title, text, img } = data;
  const directionClass: string = id % 2 ? "advantages-item--right" : "advantages-item--left";

  useEffect(() => {
    const heightWindow: number = document.documentElement.clientHeight / 3;
    // @ts-ignore
    const divPos: number = itemRef.current?.getBoundingClientRect().top;

    const handleScroll = () => {
      const scrollPos: number = window.scrollY + window.innerHeight;

      if (divPos < scrollPos) {
        setShow(true);

        let itemPercent: number = ((scrollPos - divPos) * 100) / heightWindow;
        if (itemPercent > 100) itemPercent = 100;
        if (itemPercent < 0) itemPercent = 0;
        itemPercent >= 100 ? setShowImg(true) : setShowImg(false);

        setPercentShow(itemPercent);
      } else if (divPos > scrollPos) {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setStyleTransform({
      transform: `translateX(-${percentShown ? `${100 - percentShown}vw` : `100vw`})`,
    });
  }, [show, percentShown]);

  return (
    <div style={styleTransform} className={`advantages-item ${directionClass}`} ref={itemRef}>
      {img && (
        <div className={`advantages-item__img ${showImg ? "show" : ""}`}>{listImages[img]}</div>
      )}
      <div className="advantages-item__text">
        <div className="title">{title}</div>
        <div className="text">{text}</div>
      </div>
    </div>
  );
};
