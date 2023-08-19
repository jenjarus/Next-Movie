"use client";

import { ReactElement, useEffect, useState } from "react";
import { SkeletonCard } from "./SkeletonCard";
import "../../styles/Components/Card/cards.scss";

type TypeSkeletonCards = { lines: number };
type TypeBreakpoints = {
  [key: string]: {
    width: number;
    itemsLine: number;
  };
};

export const SkeletonCards = ({ lines = 2 }: Partial<TypeSkeletonCards>) => {
  const [quantity, setQuantity] = useState<number>(lines * 5);
  const [fields, setFields] = useState<ReactElement[]>([]);

  const breakpoints: TypeBreakpoints = {
    desktop: {
      width: 1280,
      itemsLine: 5,
    },
    tablet: {
      width: 768,
      itemsLine: 4,
    },
    mobileLarge: {
      width: 500,
      itemsLine: 2,
    },
    mobile: {
      width: 0,
      itemsLine: 1,
    },
  };

  const handleResize = () => {
    const widthWindows: number = window.innerWidth;
    for (let key of Object.keys(breakpoints)) {
      if (widthWindows >= breakpoints[key].width) {
        setQuantity(lines * breakpoints[key].itemsLine);
        break;
      } else {
        setQuantity(lines * 5);
      }
    }
  };

  const chargeFields = () => {
    const creatFields: ReactElement[] = [];
    for (let i = 1; i <= quantity; i++) {
      creatFields.push(<SkeletonCard key={i} />);
    }
    setFields(creatFields);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    chargeFields();
  }, [quantity]);

  return (
    <div className="cards">
      <div className="container">
        <div className="cards__wrapper">{fields}</div>
      </div>
    </div>
  );
};
