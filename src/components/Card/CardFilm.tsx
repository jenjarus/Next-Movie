"use client";

import { MouseEventHandler, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { deleteFavoriteId, setFavoriteId } from "../../redux/favorite";
import { TypeFilm } from "../../utils/types";
import { BLUR_IMG } from "../../utils/constants";
// @ts-ignore
import FavoriteIcon from "../../public/images/favorite.svg";
import "../../styles/Components/Card/card.scss";

type TypeComponentCardFilm = { data: TypeFilm };

export const CardFilm = ({ data }: TypeComponentCardFilm) => {
  const dispatch = useAppDispatch();
  const rating: string = data.ratingKinopoisk !== null ? String(data.ratingKinopoisk) : "-";
  const favoriteItems: number[] = useAppSelector((store) => store.favorite.items);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    setIsFavorite(favoriteItems.includes(Number(data.kinopoiskId)));
  }, [favoriteItems]);

  const handleClickFavorite: MouseEventHandler = (e) => {
    e.preventDefault();
    isFavorite
      ? dispatch(deleteFavoriteId(Number(data.kinopoiskId)))
      : dispatch(setFavoriteId(Number(data.kinopoiskId)));
  };

  return (
    <Link href={`/film/${data.kinopoiskId}`} className="card">
      {rating && <div className="card__rating">{rating}</div>}
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
