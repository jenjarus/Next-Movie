"use client";

import { useEffect, useState } from "react";
import { Card } from "./Card";
import {
  fetchFilmsDefault,
  fetchFilmsPremiers,
  getApiFilmsSearch,
  fetchFilmsBests,
  fetchFilmsPopulars,
} from "../../utils/fetchAPI";
import { TypeFilms, TypeCard } from "../../utils/types";
import "../../styles/Components/Card/cards.scss";

type TypeCards = {
  page: number;
  call: string;
  keyword: string;
};

export const Cards = ({ page = 1, call = "Default", keyword = "" }: Partial<TypeCards>) => {
  const [data, setData] = useState<TypeCard[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        switch (call) {
          case "Default": {
            const { films }: TypeFilms = await fetchFilmsDefault(page as number);
            setData(films);
            break;
          }
          case "Premieres": {
            const { films }: TypeFilms = await fetchFilmsPremiers(page as number);
            setData(films);
            break;
          }
          case "TopBests": {
            const { films }: TypeFilms = await fetchFilmsBests(page as number);
            setData(films);
            break;
          }
          case "TopPopular": {
            const { films }: TypeFilms = await fetchFilmsPopulars(page as number);
            setData(films);
            break;
          }
          case "Search": {
            const { films }: TypeFilms = await getApiFilmsSearch(page as number, keyword);
            setData(films);
            break;
          }
        }
      } catch (err) {
        console.log("Error:" + err);
      }
    };
    getData();
  }, [call, keyword]);

  return (
    <section className="cards">
      <div className="container">
        <div className="cards__wrapper">
          {data?.length ? (
            data.map((el) => <Card key={el.filmId ? el.filmId : el.kinopoiskId} data={el} />)
          ) : (
            <div className="cards__not-found">Не найдено</div>
          )}
        </div>
      </div>
    </section>
  );
};

// Оставил для примера

/*export const Cards = ({ call = "Default", keyword = null }: TypeCards) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<TypeCard[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setItems(await objFetchFunc[call](call === "Search" && keyword));
        setLoading(true);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [call, keyword]);

  return (
      <section className="cards">
        {loading
            ? items?.map((el) => <Card key={el.filmId ? el.filmId : el.kinopoiskId} data={el} />)
            : "загрузка"}
      </section>
  );
};*/
