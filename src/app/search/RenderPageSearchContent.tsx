"use client";

import { useSearchParams } from "next/navigation";
import { PageTop } from "../../components/PageTop/PageTop";
import { CardsInfiniteScroll } from "../../components/Card/CardsInfiniteScroll";
import { Viewed } from "../../components/Card/Viewed";

export const RenderPageSearchContent = () => {
  const searchParams = useSearchParams();
  const keyword: string | null = searchParams.get("keyword");
  const initialValue: string = keyword ? keyword : "";

  return (
    <>
      <PageTop title={[<span key={1}>Поиск</span>]} isDisplaySearch={true} />
      <CardsInfiniteScroll call="Search" keyword={initialValue} />
      <Viewed />
    </>
  );
};
