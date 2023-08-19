"use client";

import { useEffect, useState } from "react";
import { CardFilm } from "./CardFilm";
import { SkeletonCards } from "../Skeleton/SkeletonCards";
import { fetchFilmsCard } from "../../utils/fetchAPI";
import { TypeFilm } from "../../utils/types";

type TypeCardsFavorite = { cartItems: number[] | null };

export const CardsFavorite = ({ cartItems }: TypeCardsFavorite) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [items, setItems] = useState<TypeFilm[]>([]);

  useEffect(() => {
    if (cartItems) {
      const getData = async () => {
        try {
          const films: TypeFilm[] = await fetchFilmsCard(cartItems);
          setItems(films);
          setIsLoading(true);
        } catch (err) {
          console.log(err);
        }
      };
      getData();
    }
  }, [cartItems]);

  return isLoading ? (
    <section className="cards">
      <div className="container">
        {items?.length ? (
          <div className="cards__wrapper">
            {items.map((el) => (
              <CardFilm key={el.kinopoiskId} data={el} />
            ))}
          </div>
        ) : (
          <div className="cards__not-found">Нет избранных фильмов</div>
        )}
      </div>
    </section>
  ) : (
    <SkeletonCards />
  );
};
