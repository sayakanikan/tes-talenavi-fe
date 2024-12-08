import { Genre } from "./genre";

export interface Movie {
  id: number;
  title: string;
  director: string;
  summary: string;
  genres: Genre[];
}

export interface MovieRequest {
  title: string;
  director: string;
  summary: string;
  genresIds: number[];
}