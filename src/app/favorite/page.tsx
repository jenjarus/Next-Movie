import { Metadata } from "next";
import { PageTop } from "../../components/PageTop/PageTop";
import { RenderPage } from "./RenderPage";

export const metadata: Metadata = {
  title: "ПоискКино - избранное",
  description: "Сайт для поиска кино. Избранное",
};

const Favorite = () => {
  return (
    <main className="page">
      <PageTop title={[<span key={1}>Избранное</span>]} />
      <RenderPage />
    </main>
  );
};

export default Favorite;
