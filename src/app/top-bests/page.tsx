import { Metadata } from "next";
import { PageTop } from "../../components/PageTop/PageTop";
import { CardsInfiniteScroll } from "../../components/Card/CardsInfiniteScroll";
import { Viewed } from "../../components/Card/Viewed";

export const metadata: Metadata = {
  title: "ПоискКино - лучшие фильмы",
  description: "Сайт для поиска кино. Лучшие фильмы",
};

const TopBests = () => {
  return (
    <main className="page">
      <PageTop title={["Лучшие ", <span key={1}>фильмы</span>]} isDisplayButtons={true} />
      <CardsInfiniteScroll call="TopBests" />
      <Viewed />
    </main>
  );
};

export default TopBests;
