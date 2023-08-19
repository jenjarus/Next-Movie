import { Metadata } from "next";
import { PageTop } from "../../components/PageTop/PageTop";
import { CardsInfiniteScroll } from "../../components/Card/CardsInfiniteScroll";
import { Viewed } from "../../components/Card/Viewed";

export const metadata: Metadata = {
  title: "ПоискКино - премьеры месяца",
  description: "Сайт для поиска кино. Премьеры месяца",
};

const Premieres = () => {
  return (
    <main className="page">
      <PageTop title={["Премьеры ", <span key={1}>месяца</span>]} isDisplayButtons={true} />
      <CardsInfiniteScroll call="Premieres" />
      <Viewed />
    </main>
  );
};

export default Premieres;
