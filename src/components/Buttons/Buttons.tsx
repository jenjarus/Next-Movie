import Link from "next/link";
import "../../styles/Components/buttons.scss";

export const Buttons = () => {
  return (
    <section className="buttons">
      <div className="container">
        <div className="buttons__wrapper">
          <Link href="/top-bests" className="buttons__link">
            Лучшие фильмы
          </Link>
          <Link href="/top-popular" className="buttons__link">
            Популярные фильмы
          </Link>
          <Link href="/premieres" className="buttons__link">
            Премьеры месяца
          </Link>
        </div>
      </div>
    </section>
  );
};
