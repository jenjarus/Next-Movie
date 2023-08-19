import Link from "next/link";
import { Metadata } from "next";
import "../styles/Pages/not-found.scss";

export const metadata: Metadata = {
  title: "ПоискКино - 404",
  description: "Сайт для поиска кино. 404",
};

const NotFound = () => {
  return (
    <main className="not-found">
      <div className="container">
        <h1>404. Страница не найдена</h1>
        <p>К сожалению, запрашиваемая страница не найдена...</p>
        <div className="not-found__link">
          <p>
            <Link href="/">Перейти на главную</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
