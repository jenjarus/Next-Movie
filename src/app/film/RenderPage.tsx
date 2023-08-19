"use client";

import { MouseEventHandler, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { deleteFavoriteId, setFavoriteId } from "../../redux/favorite";
import { TypeFilm, TypeFilmBoxOffice, TypeFilmStaff } from "../../utils/types";
import { fetchFilm, fetchFilmBoxOffice, fetchFilmStaff } from "../../utils/fetchAPI";
import { setViewedId } from "../../redux/viewed";
import Image from "next/image";
import { BLUR_IMG } from "../../utils/constants";
import { Viewed } from "../../components/Card/Viewed";
import { SkeletonFilm } from "../../components/Skeleton/SkeletonFilm";
import NotFound from "../not-found";

type TypeFilmPage = { params: { id: number } };

export const RenderPage = ({ params }: TypeFilmPage) => {
  const dispatch = useAppDispatch();
  const favoriteItems: number[] = useAppSelector((store) => store.favorite.items);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(favoriteItems.includes(Number(params.id)));
  const [data, setData] = useState<TypeFilm | null>(null);
  const LENGTH_ITEMS_ACTORS: number = 10;

  const handleResize = () => {
    window.innerWidth <= 767 ? setIsMobile(true) : setIsMobile(false);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let dataFilm: TypeFilm = await fetchFilm(params.id);
        if (dataFilm.status) {
          Object.assign(dataFilm, await fetchFilmBoxOffice(params.id));
          Object.assign(dataFilm, await fetchFilmStaff(params.id));

          setData(dataFilm);
          setisLoading(true);
          dispatch(setViewedId(Number(params.id)));
        } else {
          setData(null);
          setisLoading(true);
        }
      } catch (err) {
        console.log(err);
        setisLoading(true);
      }
    };
    fetchData();
  }, [params.id]);

  useEffect(() => {
    setIsFavorite(favoriteItems.includes(Number(params.id)));
  }, [favoriteItems]);

  const getBoxOfficeValue = (data: TypeFilmBoxOffice[], type: string): string => {
    const foundData: TypeFilmBoxOffice | undefined = data.find((el) => el.type === type);

    if (foundData) {
      const amount: string = String(foundData.amount.toLocaleString());
      const symbol: string = " " + foundData.symbol;

      return amount + symbol;
    }

    return "-";
  };

  const getStaff = (data: TypeFilmStaff[], type: string): TypeFilmStaff[] | null => {
    const foundData: TypeFilmStaff[] = data.filter((el) => el.professionKey === type);

    return foundData.length ? foundData : null;
  };

  const outputStaff = (arr: TypeFilmStaff[], maxItems: number = arr.length): string => {
    return arr
      .slice(0, maxItems)
      .map((el) => (el.nameRu ? el.nameRu : el.nameEn))
      .join(", ");
  };

  const getFilmTime = (initialMinutes: number): string => {
    const minutes: number = initialMinutes % 60;
    const hours: number = (initialMinutes - minutes) / 60;
    return (
      (hours < 10 ? "0" : "") +
      hours.toString() +
      ":" +
      (minutes < 10 ? "0" : "") +
      minutes.toString()
    );
  };

  const handleClickFavorite: MouseEventHandler = () => {
    isFavorite
      ? dispatch(deleteFavoriteId(Number(params.id)))
      : dispatch(setFavoriteId(Number(params.id)));
  };

  const RenderContent = () => {
    const [isDisplayAllActors, setIsDisplayAllActors] = useState<boolean>(false);

    if (data) {
      const receivedData: TypeFilm = data;
      const rating: string =
        receivedData.ratingKinopoisk !== null ? String(receivedData.ratingKinopoisk) : "-";
      const budget: string | null = receivedData?.items
        ? getBoxOfficeValue(receivedData.items, "BUDGET")
        : null;
      const boxOfficeWorld: string | null = receivedData?.items
        ? getBoxOfficeValue(receivedData.items, "WORLD")
        : null;
      const boxOfficeRussia: string | null = receivedData?.items
        ? getBoxOfficeValue(receivedData.items, "RUS")
        : null;
      const directors: TypeFilmStaff[] | null = receivedData?.staff
        ? getStaff(receivedData.staff, "DIRECTOR")
        : null;
      const writer: TypeFilmStaff[] | null = receivedData?.staff
        ? getStaff(receivedData.staff, "WRITER")
        : null;
      const producer: TypeFilmStaff[] | null = receivedData?.staff
        ? getStaff(receivedData.staff, "PRODUCER")
        : null;
      const composer: TypeFilmStaff[] | null = receivedData?.staff
        ? getStaff(receivedData.staff, "COMPOSER")
        : null;
      const actor: TypeFilmStaff[] | null = receivedData?.staff
        ? getStaff(receivedData.staff, "ACTOR")
        : null;

      return (
        <>
          <section className="film__page-top">
            <div className="container">
              <div className="film__page-top__wrapper">
                {!isMobile && (
                  <div className="film__page-img">
                    <Image
                      src={receivedData.posterUrl}
                      width={300}
                      height={400}
                      alt={receivedData.nameRu}
                      placeholder="blur"
                      blurDataURL={BLUR_IMG}
                    />
                  </div>
                )}
                <div className="film__page-info">
                  <div className="film__page-info__top">
                    <h1>{`${receivedData.nameRu} (${receivedData.year})`}</h1>
                    <div className="film__page-rating">{rating}</div>
                  </div>
                  <div className="film__page-info__favorite">
                    <button
                      className="film__page-info__favorite-button"
                      onClick={handleClickFavorite}
                    >
                      {isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
                    </button>
                  </div>
                  {isMobile && (
                    <div className="film__page-img">
                      <Image
                        src={receivedData.posterUrl}
                        width={300}
                        height={400}
                        alt={receivedData.nameRu}
                        placeholder="blur"
                        blurDataURL={BLUR_IMG}
                      />
                    </div>
                  )}
                  <div className="film__page-info__main">
                    <div className="film__page-info__main-title">О фильме</div>
                    <div className="film__page-info__main-items">
                      {receivedData.year && (
                        <div className="film__page-info__main-item">
                          <div className="film__page-info__main-item__title">Год производства</div>
                          <div className="film__page-info__main-item__value">
                            {receivedData.year}
                          </div>
                        </div>
                      )}
                      {receivedData.countries && (
                        <div className="film__page-info__main-item">
                          <div className="film__page-info__main-item__title">Страна</div>
                          <div className="film__page-info__main-item__value">
                            {receivedData.countries.map((el) => el.country).join(", ")}
                          </div>
                        </div>
                      )}
                      {receivedData.genres && (
                        <div className="film__page-info__main-item">
                          <div className="film__page-info__main-item__title">Жанр</div>
                          <div className="film__page-info__main-item__value">
                            {receivedData.genres.map((el) => el.genre).join(", ")}
                          </div>
                        </div>
                      )}
                      {receivedData.slogan && (
                        <div className="film__page-info__main-item">
                          <div className="film__page-info__main-item__title">Слоган</div>
                          <div className="film__page-info__main-item__value">
                            «{receivedData.slogan}»
                          </div>
                        </div>
                      )}
                      {directors && (
                        <div className="film__page-info__main-item">
                          <div className="film__page-info__main-item__title">Режиссер</div>
                          <div className="film__page-info__main-item__value">
                            {outputStaff(directors)}
                          </div>
                        </div>
                      )}
                      {writer && (
                        <div className="film__page-info__main-item">
                          <div className="film__page-info__main-item__title">Сценарий</div>
                          <div className="film__page-info__main-item__value">
                            {outputStaff(writer)}
                          </div>
                        </div>
                      )}
                      {producer && (
                        <div className="film__page-info__main-item">
                          <div className="film__page-info__main-item__title">Продюсер</div>
                          <div className="film__page-info__main-item__value">
                            {outputStaff(producer)}
                          </div>
                        </div>
                      )}
                      {composer && (
                        <div className="film__page-info__main-item">
                          <div className="film__page-info__main-item__title">Композитор</div>
                          <div className="film__page-info__main-item__value">
                            {outputStaff(composer)}
                          </div>
                        </div>
                      )}
                      {budget && (
                        <div className="film__page-info__main-item">
                          <div className="film__page-info__main-item__title">Бюджет</div>
                          <div className="film__page-info__main-item__value">{budget}</div>
                        </div>
                      )}
                      {boxOfficeWorld && (
                        <div className="film__page-info__main-item">
                          <div className="film__page-info__main-item__title">Сборы в мире</div>
                          <div className="film__page-info__main-item__value">{boxOfficeWorld}</div>
                        </div>
                      )}
                      {boxOfficeRussia && (
                        <div className="film__page-info__main-item">
                          <div className="film__page-info__main-item__title">Сборы в России</div>
                          <div className="film__page-info__main-item__value">{boxOfficeRussia}</div>
                        </div>
                      )}
                      {receivedData.filmLength && (
                        <div className="film__page-info__main-item">
                          <div className="film__page-info__main-item__title">Время</div>
                          <div className="film__page-info__main-item__value">
                            {receivedData.filmLength} мин. ({getFilmTime(receivedData.filmLength)})
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {actor && (
                    <section className="film__page-actors">
                      <div className="film__page-actors__title">В главных ролях</div>
                      <div className="film__page-actors__list">
                        {isDisplayAllActors
                          ? outputStaff(actor)
                          : outputStaff(actor, LENGTH_ITEMS_ACTORS)}
                        {actor.length > LENGTH_ITEMS_ACTORS && (
                          <button
                            className="film__page-actors__all"
                            onClick={() => setIsDisplayAllActors(!isDisplayAllActors)}
                          >
                            {isDisplayAllActors ? "Свернуть" : "Показать всех"}
                          </button>
                        )}
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </div>
          </section>
          {receivedData.description && (
            <section className="film__page-desc">
              <div className="container">
                <div className="film__page-desc__title">Описание</div>
                <div className="film__page-desc__text">{receivedData.description}</div>
              </div>
            </section>
          )}
          <Viewed idFilm={Number(params.id)} />
        </>
      );
    } else {
      return <NotFound />;
    }
  };

  return isLoading ? <RenderContent /> : <SkeletonFilm />;
};
