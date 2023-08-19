import { PageTop } from "../components/PageTop/PageTop";
import { Advantages } from "../components/Advantages/Advantages";
import { Viewed } from "../components/Card/Viewed";
import { CardsInfiniteScroll } from "../components/Card/CardsInfiniteScroll";

const Home = () => {
  return (
    <main className="main__page">
      <PageTop
        title={["ПОИСК", <span key={1}>КИНО</span>]}
        text={["Сайт для поиска интересных фильмов"]}
        isDisplaySearch={true}
        isDisplayButtons={true}
      />
      <Advantages />
      <CardsInfiniteScroll />
      <Viewed />
    </main>
  );
};

export default Home;
