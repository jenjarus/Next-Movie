"use client";

import { useEffect, useRef, useState } from "react";
import {
  fetchFilmsDefault,
  fetchFilmsPremiers,
  getApiFilmsSearch,
  fetchFilmsBests,
  fetchFilmsPopulars,
} from "../../utils/fetchAPI";
import { Card } from "./Card";
import { SkeletonCards } from "../Skeleton/SkeletonCards";
import { TypeFilms, TypeCard } from "../../utils/types";

type TypeCards = {
  call: string;
  keyword: string;
};

export const CardsInfiniteScroll = ({ call = "Default", keyword = "" }: Partial<TypeCards>) => {
  const [items, setItems] = useState<TypeCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isChangedKeyword, setIsChangedKeyword] = useState<boolean>(false);

  const fetchData = async () => {
    let data: TypeFilms | null = null;
    setIsLoading(true);
    setIsEmpty(false);

    try {
      switch (call) {
        case "Default": {
          data = await fetchFilmsDefault(page as number);
          break;
        }
        case "Premieres": {
          data = await fetchFilmsPremiers(page as number);
          break;
        }
        case "TopBests": {
          data = await fetchFilmsBests(page as number);
          break;
        }
        case "TopPopular": {
          data = await fetchFilmsPopulars(page as number);
          break;
        }
        case "Search": {
          data = await getApiFilmsSearch(page as number, keyword as string);
          break;
        }
      }

      if (data?.films.length) {
        setItems([...items, ...data.films]);
        setMaxPage(data.pagesCount + 1);
        setPage(page + 1);
      } else {
        setIsEmpty(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    // @ts-ignore
    if (sectionRef.current?.getBoundingClientRect().bottom - window.innerHeight >= 0 || isLoading) {
      return;
    }
    fetchData();
  };

  useEffect(() => {
    setItems([]);
    setIsEmpty(false);
    setPage(1);
    setMaxPage(1);
    setIsChangedKeyword(true);
  }, [keyword]);

  useEffect(() => {
    fetchData();
    setIsChangedKeyword(false);
  }, [isChangedKeyword]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (maxPage >= page && !isEmpty) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isLoading]);

  return (
    <>
      <section className="cards" ref={sectionRef}>
        <div className="container">
          {!isEmpty ? (
            <div className="cards__wrapper">
              {items.map((el) => (
                <Card key={el.filmId ? el.filmId : el.kinopoiskId} data={el} />
              ))}
            </div>
          ) : (
            <div className="cards__not-found">Не найдено</div>
          )}
        </div>
      </section>
      {isLoading && <SkeletonCards />}
    </>
  );
};
