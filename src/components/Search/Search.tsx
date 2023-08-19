"use client";

import { ChangeEventHandler, KeyboardEventHandler, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchDropdown } from "./SearchDropdown";
// @ts-ignore
import SearchIcon from "../../public/images/search.svg";
import "../../styles/Components/Search/search.scss";

export const Search = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const keyword: string | null = searchParams.get("keyword");
  const initialValue: string = keyword ? keyword : "";
  const [value, setValue] = useState<string>(initialValue);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handlerChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handlerSubmit = () => {
    if (value.trim()) push(`/search?keyword=${value}`);
  };

  const handlerKeyDownInput: KeyboardEventHandler = (e) => {
    if (e.key === "Enter" && value.trim()) handlerSubmit();
  };

  const handlerFocus = () => {
    setIsFocused(true);
  };
  const handlerBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 300);
  };

  return (
    <section className="search">
      <div className="container">
        <div className="search__wrapper">
          <input
            className="search__input"
            type="text"
            placeholder="Поиск фильмов"
            value={value}
            onChange={handlerChange}
            onKeyDown={handlerKeyDownInput}
            onFocus={handlerFocus}
            onBlur={handlerBlur}
          />
          <button className="search__submit" onClick={handlerSubmit}>
            <SearchIcon />
          </button>
          <SearchDropdown keyword={value} focused={isFocused} />
        </div>
      </div>
    </section>
  );
};
