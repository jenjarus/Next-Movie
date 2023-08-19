"use client";

import { ReactNode, useEffect, useState } from "react";
import { Search } from "../Search/Search";
import { Buttons } from "../Buttons/Buttons";
import "../../styles/Components/topPage.scss";

type TypePageTop = {
  title: ReactNode[] | null;
  text: ReactNode[] | null;
  isDisplaySearch: boolean;
  isDisplayButtons: boolean;
};

export const PageTop = ({
  title = null,
  text = null,
  isDisplaySearch = false,
  isDisplayButtons = false,
}: Partial<TypePageTop>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const classDisplayAnimation: string = "show";

  useEffect(() => {
    setIsLoading(true);
  }, []);

  return (
    <div className="page__top">
      <div className="page__top-bg"></div>
      <div className="container">
        <div className="page__top-head">
          {title && title.length && (
            <h1 className={isLoading ? classDisplayAnimation : ""}>{title.map((el) => el)}</h1>
          )}
          {text && text.length && (
            <p className={`page__top-text ${isLoading ? classDisplayAnimation : ""}`}>
              {text.map((el) => el)}
            </p>
          )}
        </div>
        {isDisplaySearch && <Search />}
        {isDisplayButtons && <Buttons />}
      </div>
    </div>
  );
};
