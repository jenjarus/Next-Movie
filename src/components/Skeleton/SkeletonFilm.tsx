"use client";

import { useEffect, useState } from "react";
import "../../styles/Components/Skeleton/skeletonFilm.scss";

export const SkeletonFilm = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleResize = () => {
    window.innerWidth <= 767 ? setIsMobile(true) : setIsMobile(false);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="film__page-top skeleton-film">
        <div className="container">
          <div className="film__page-top__wrapper">
            {!isMobile && <div className="skeleton-film__img"></div>}
            <div className="film__page-info">
              <div className="film__page-info__top">
                <div className="skeleton-film__title"></div>
                <div className="skeleton-film__rating"></div>
              </div>
              {isMobile && <div className="skeleton-film__img"></div>}
              <div className="skeleton-film__text">
                <div className="skeleton-film__text-title"></div>
                <div className="skeleton-film__line skeleton-film__line--first"></div>
                <div className="skeleton-film__line skeleton-film__line--second"></div>
                <div className="skeleton-film__line skeleton-film__line--third"></div>
                <div className="skeleton-film__line skeleton-film__line--first"></div>
                <div className="skeleton-film__line skeleton-film__line--second"></div>
                <div className="skeleton-film__line skeleton-film__line--third"></div>
                <div className="skeleton-film__line skeleton-film__line--first"></div>
                <div className="skeleton-film__line skeleton-film__line--second"></div>
                <div className="skeleton-film__line skeleton-film__line--third"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
