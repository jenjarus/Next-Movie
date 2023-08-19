import { useEffect, useState } from "react";
import Link from "next/link";
import { getApiFilmsSearch } from "../../utils/fetchAPI";
import { SearchDropdownItem } from "./SearchDropdownItem";
import { SkeletonSearchDropdown } from "../Skeleton/SkeletonSearchDropdown";
import { TypeFilms } from "../../utils/types";
import "../../styles/Components/Search/searchDropdown.scss";

type TypeSearchDropdown = {
  keyword: string;
  focused: boolean;
};

export const SearchDropdown = ({ keyword, focused }: TypeSearchDropdown) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [items, setItems] = useState<TypeFilms | null>(null);
  const focusedClass: string = focused && keyword.length ? " search__dropdown--focused" : "";

  useEffect(() => {
    setIsLoading(false);
    const getData = async () => {
      try {
        setItems(await getApiFilmsSearch(1, keyword));
        setIsLoading(true);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [keyword]);

  const RenderDropdown = () => {
    if (isLoading) {
      if (items?.films.length) {
        return (
          <>
            {items.films.slice(0, 5).map((el) => (
              <SearchDropdownItem key={el.filmId} data={el} />
            ))}
            <Link href={`/search?keyword=${keyword}`} className="search__dropdown-link__all">
              Показать все
            </Link>
          </>
        );
      } else {
        return <div className="search__dropdown-item">Не найдено</div>;
      }
    } else {
      return <SkeletonSearchDropdown />;
    }
  };

  return (
    <div className={`search__dropdown${focusedClass}`}>
      <div className="search__dropdown-wrapper">
        <RenderDropdown />
      </div>
    </div>
  );
};
