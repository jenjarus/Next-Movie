import { TypeFilms, TypeCard, TypeFilm, TypeFilmBoxOffice } from "./types";

const monthNames: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const apiKey: HeadersInit = {
  "X-API-KEY": "943156f1-51e2-4bba-9657-e25705632abd",
};
const date: Date = new Date();
const year: number = date.getFullYear();
const month: string = monthNames[date.getMonth()].toUpperCase();

export const fetchFilmsDefault = async (page: number) => {
  const url: string = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?page=${page}`;
  const response = await fetch(url, { headers: apiKey });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const result: TypeFilms = await response.json();
  return result;
};

export const fetchFilmsPremiers = async (page: number) => {
  let url: string = `https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=${year}&month=${month}&page=${page}`;
  const response = await fetch(url, { headers: apiKey });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const result: { pagesCount: number; items: TypeCard[] } = await response.json();

  return {
    pagesCount: result.pagesCount,
    films: result.items.filter((el) => new Date(el.premiereRu).getTime() >= date.getTime()),
  };
};

export const fetchFilmsBests = async (page: number) => {
  let url: string = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${page}`;
  const response = await fetch(url, { headers: apiKey });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const result: TypeFilms = await response.json();

  return result;
};

export const fetchFilmsPopulars = async (page: number) => {
  let url: string = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${page}`;
  const response = await fetch(url, { headers: apiKey });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const result: TypeFilms = await response.json();

  return result;
};

export const getApiFilmsSearch = async (page: number, keyword?: string) => {
  let url: string = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${keyword}&page=${page}`;
  const response = await fetch(url, { headers: apiKey });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const result: TypeFilms = await response.json();

  return result;
};

export const fetchFilm = async (id: number) => {
  let url: string = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`;
  const response = await fetch(url, { headers: apiKey });

  if (!response.ok && response.status !== 404 && response.status !== 400) {
    throw new Error("Failed to fetch data");
  }

  const result: TypeFilm = await response.json();
  if (response.status === 400 || response.status === 404) {
    result.status = false;
    return result;
  }
  result.status = true;

  return result;
};

export const fetchFilmBoxOffice = async (id: number) => {
  let url: string = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/box_office`;
  const response = await fetch(url, { headers: apiKey });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const result: { items: TypeFilmBoxOffice[] } = await response.json();

  return result;
};

export const fetchFilmStaff = async (id: number) => {
  let url: string = `https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${id}`;
  const response = await fetch(url, { headers: apiKey });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const result: { items: TypeFilmBoxOffice[] } = await response.json();

  return { staff: result };
};

export const fetchFilmsCard = (items: number[]) => {
  return Promise.all(
    items.map(async (id) => {
      let url: string = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`;
      const response = await fetch(url, { headers: apiKey });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result: TypeFilm = await response.json();

      return result;
    })
  );
};
