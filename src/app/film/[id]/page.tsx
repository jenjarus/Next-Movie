import { Metadata } from "next";
import { RenderPage } from "../RenderPage";
import { fetchFilm } from "../../../utils/fetchAPI";
import { TypeFilm } from "../../../utils/types";
import "../../../styles/Pages/Film/page.scss";

type Props = {
  params: { id: number };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  const { nameRu }: TypeFilm = await fetchFilm(id);

  if (nameRu) {
    return {
      title: `${nameRu} - ПоискКино`,
      description: `Сайт для поиска кино. Фильм ${nameRu}`,
    };
  } else {
    return {
      title: "ПоискКино - 404",
      description: "Сайт для поиска кино. 404",
    };
  }
}

type TypeFilmPage = { params: { id: number } };

const FilmPage = ({ params }: TypeFilmPage) => {
  return (
    <main className="film__page">
      <RenderPage params={params} />
    </main>
  );
};

export default FilmPage;
