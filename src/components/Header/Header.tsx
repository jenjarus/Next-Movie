import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import Link from "next/link";
// @ts-ignore
import FavoriteIcon from "../../public/images/favorite.svg";
import "../../styles/Components/header.scss";

export const Header = () => {
  const favoriteItems: number[] = useAppSelector((store) => store.favorite.items);
  const [favoriteCount, setFavoriteCount] = useState<number>(0);

  useEffect(() => {
    setFavoriteCount(favoriteItems.length);
  }, [favoriteItems]);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrap">
          <div className="header__logo">
            <Link href="/">
              Поиск<span className="header__logo-highlight">Кино</span>
            </Link>
          </div>
          <div className="header__favorite">
            <Link href="/favorite">
              <FavoriteIcon />
              {favoriteCount ? <span className="header__favorite-count">{favoriteCount}</span> : ""}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
