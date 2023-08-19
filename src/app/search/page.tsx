import { Metadata } from "next";
import { RenderPageSearchContent } from "./RenderPageSearchContent";

export const metadata: Metadata = {
  title: "ПоискКино - поиск",
  description: "Сайт для поиска кино. Поиск",
};

const SearchPage = () => {
  return (
    <main className="page">
      <RenderPageSearchContent />
    </main>
  );
};

export default SearchPage;
