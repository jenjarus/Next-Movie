"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { CardsFavorite } from "../../components/Card/CardsFavorite";

export const RenderPage = () => {
  const favoriteItems: number[] = useAppSelector((store) => store.favorite.items);
  const [items, setItems] = useState<number[]>([]);

  useEffect(() => {
    setItems(favoriteItems);
  }, [favoriteItems]);

  return items && <CardsFavorite cartItems={items} />;
};
