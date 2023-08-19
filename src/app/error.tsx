"use client";

import React from "react";
import Link from "next/link";

const Error = ({ error, reset }: { error: React.ReactNode; reset: () => void }) => {
  return (
    <main className="not-found">
      <div className="container">
        <h1>Произошла ошибка</h1>
        <p>К сожалению, произошла ошибка:</p>
        <p>{error}</p>
        <p>Обновите страницу, или вернитесь на главную</p>
        <div className="not-found__link">
          <p>
            <Link href="/">Перейти на главную</Link>
          </p>
          <p>
            <a type="button" onClick={() => reset()}>
              Обновить страницу
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Error;
