"use client";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Genre } from "../../interfaces/genre";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

const DetailMovie = () => {
  const [title, setTitle] = useState<string>("");
  const [director, setDirector] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const movieId = searchParams.get("id");

  useEffect(() => {
    if (movieId) {
      api
        .get(`/movies/${movieId}`)
        .then((response) => {
          const movie = response.data;
          setTitle(movie.title);
          setDirector(movie.director);
          setSummary(movie.summary);
          setGenres(movie.genres);
        })
        .catch((err) => {
          toast.error("Failed to fetch movie details");
          console.error("Error fetching movie:", err);
        });
    }
  }, [movieId]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-indigo-600 p-6 text-white">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="mt-2">Directed by: <span className="font-medium">{director}</span></p>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Summary</h2>
          <p className="text-gray-600 leading-relaxed">{summary}</p>

          <h3 className="mt-6 text-lg font-semibold text-gray-700">Genres</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {genres.map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 bg-indigo-100 text-indigo-600 text-sm font-medium rounded-full"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <div className="mt-6">
            <Link href="/">
              <button className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailMovie;
