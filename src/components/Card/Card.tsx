"use client";

import { MouseEventHandler, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { deleteFavoriteId, setFavoriteId } from "../../redux/favorite";
import { TypeCard } from "../../utils/types";
import { BLUR_IMG } from "../../utils/constants";
// @ts-ignore
import FavoriteIcon from "../../public/images/favorite.svg";
import "../../styles/Components/Card/card.scss";

type TypeComponentCard = { data: TypeCard };

export const Card = ({ data }: TypeComponentCard) => {
  const dispatch = useAppDispatch();
  const rating: string = data.rating !== "null" ? data.rating : "-";
  const id: number = data.filmId ? data.filmId : data.kinopoiskId;
  const favoriteItems: number[] = useAppSelector((store) => store.favorite.items);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    setIsFavorite(favoriteItems.includes(Number(id)));
  }, [favoriteItems]);

  const handleClickFavorite: MouseEventHandler = (e) => {
    e.preventDefault();
    isFavorite ? dispatch(deleteFavoriteId(Number(id))) : dispatch(setFavoriteId(Number(id)));
  };

  return (
    <Link href={`/film/${id}`} className="card">
      {data.rating && <div className="card__rating">{rating}</div>}
      <button
        className={`card__favorite${isFavorite ? " active" : ""}`}
        onClick={handleClickFavorite}
      >
        <FavoriteIcon />
      </button>
      <div className="card__img">
        <Image
          src={data.posterUrlPreview}
          width={500}
          height={600}
          alt={data.nameRu}
          placeholder="blur"
          blurDataURL={BLUR_IMG}
        />
      </div>
      <div className="card__info">
        <div className="card__name">{data.nameRu}</div>
        <div className="card__bottom">
          <div className="card__date">{data.year}</div>
          <div className="card__genres">{data.genres[0] ? data.genres[0].genre : ""}</div>
        </div>
      </div>
    </Link>
  );
};
