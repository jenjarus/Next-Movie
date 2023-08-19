"use client";

import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "../redux";
import Loading from "./loading";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { TopPageButton } from "../components/TopPageButton/TopPageButton";

type TypeRootLayout = { childrenPage: React.ReactNode };

export const RootLayoutRender = ({ childrenPage }: TypeRootLayout) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  return (
    <Provider store={store}>
      {!isLoading && <Loading />}
      <Header />
      {childrenPage}
      <Footer />
      <TopPageButton />
    </Provider>
  );
};
