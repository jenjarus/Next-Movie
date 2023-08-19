import "../../styles/Components/Advantages/advantages.scss";
import { AdvantagesItem } from "./AdvantagesItem";

export type TypeAdvantagesObjects = {
  title: string;
  text: string;
  img?: string;
};

const advantagesObjects: TypeAdvantagesObjects[] = [
  {
    title: "Смотрите популярные фильмы",
    text: "На сайте представлены топы лучших и популярных фильмов, которые помогут скрасить вечерний досуг",
    img: "bests",
  },
  {
    title: "Поиск фильмов",
    text: "С помощью поиска, доступного на сайте, вы можете найти интересующий вас фильм",
    img: "search",
  },
  {
    title: "Избранное",
    text: "Добавляйте фильмы в избранное, чтобы не забыть интересующие вас фильмы",
    img: "favorite",
  },
  {
    title: "Премьеры месяца",
    text: "В блоке &laquo;Премьеры месяца&raquo; представлены фильмы которые выходят в прокат в этом месяце",
    img: "premieres",
  },
];

export const Advantages = () => {
  return (
    <section className="advantages">
      <div className="advantages__wrapper">
        <div className="advantages__title">
          Возможности <span>сайта</span>
        </div>
        {advantagesObjects.map((el, i) => (
          <AdvantagesItem key={i} id={i} data={el} />
        ))}
      </div>
    </section>
  );
};
