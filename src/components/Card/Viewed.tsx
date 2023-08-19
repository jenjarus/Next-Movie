"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useAppSelector } from "../../redux/hooks";
import { CardFilm } from "./CardFilm";
import { SkeletonCards } from "../Skeleton/SkeletonCards";
import { fetchFilmsCard } from "../../utils/fetchAPI";
import { TypeFilm } from "../../utils/types";
// @ts-ignore
import ArrowLeftIcon from "../../public/images/arrow-left.svg";
// @ts-ignore
import ArrowRightIcon from "../../public/images/arrow-right.svg";
import "swiper/css";
import "../../styles/Components/Card/viewed.scss";

type TypeViewed = { idFilm: number | null };

export const Viewed = ({ idFilm = null }: Partial<TypeViewed>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<TypeFilm[]>([]);
  const cartItems: number[] = useAppSelector((store) => store.viewed.items).filter(
    (el) => el !== idFilm
  );

  useEffect(() => {
    const getData = async () => {
      try {
        setItems((await fetchFilmsCard(cartItems)) as TypeFilm[]);
        setLoading(true);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return loading ? (
    items?.length ? (
      <section className="viewed__section">
        <div className="container">
          <div className="viewed__section-top">
            <div className="viewed__section-title">Просмотренное</div>
            <div className="viewed__section-arrows">
              <button className="viewed__section-arrow viewed__section-arrow--prev">
                <ArrowLeftIcon />
              </button>
              <button className="viewed__section-arrow viewed__section-arrow--next">
                <ArrowRightIcon />
              </button>
            </div>
          </div>
          <Swiper
            className="viewed__section-slider swiper-slider"
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            navigation={{
              prevEl: ".viewed__section-arrow--prev",
              nextEl: ".viewed__section-arrow--next",
            }}
            breakpoints={{
              1280: {
                slidesPerView: 5,
              },
              1024: {
                slidesPerView: 4,
              },
              500: {
                slidesPerView: 2,
              },
            }}
            loop={true}
          >
            {items.map((el) => {
              return (
                <SwiperSlide key={el.kinopoiskId}>
                  <CardFilm data={el} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>
    ) : (
      <></>
    )
  ) : (
    <SkeletonCards lines={1} />
  );
};
