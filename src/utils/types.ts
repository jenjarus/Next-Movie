export type TypeCard = {
  filmId: number;
  kinopoiskId: number;
  rating: string;
  posterUrlPreview: string;
  nameRu: string;
  year: string;
  premiereRu: string;
  genres: { genre: string }[];
};

export type TypeFilms = {
  pagesCount: number;
  films: TypeCard[];
};

export type TypeFilmBoxOffice = {
  type: string;
  amount: number;
  symbol: string;
};

export type TypeFilmStaff = {
  nameRu?: string;
  nameEn: string;
  professionKey: string;
};

export type TypeFilm = {
  filmId: number;
  kinopoiskId: number;
  ratingKinopoisk: number | null;
  posterUrl: string;
  posterUrlPreview: string;
  nameRu: string;
  year: number;
  premiereRu: string;
  genres: { genre: string }[];
  description: string;
  slogan: string;
  filmLength: number;
  countries: { country: string }[];

  items?: TypeFilmBoxOffice[];
  staff?: TypeFilmStaff[];

  status: boolean;
};

export type TypeIdsReducers = {
  items: number[];
};
