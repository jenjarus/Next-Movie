import { Metadata } from "next";
import { PageTop } from "../../components/PageTop/PageTop";
import { CardsInfiniteScroll } from "../../components/Card/CardsInfiniteScroll";
import { Viewed } from "../../components/Card/Viewed";

export const metadata: Metadata = {
  title: "ПоискКино - популярные фильмы",
  description: "Сайт для поиска кино. Популярные фильмы",
};

const TopPopular = () => {
  return (
    <main className="page">
      <PageTop title={["Популярные ", <span key={1}>фильмы</span>]} isDisplayButtons={true} />
      <CardsInfiniteScroll call="TopPopular" />
      <Viewed />
    </main>
  );
};

export default TopPopular;
