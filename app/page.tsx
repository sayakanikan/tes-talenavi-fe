"use client";
import { useEffect, useState } from "react";
import api from "../app/services/api";
import { Movie } from "../app/interfaces/movie";
import Link from "next/link";

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    api
      .get("/movies")
      .then((response) => setMovies(response.data))
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Movies Collection</h1>
        <div className="flex justify-end mb-6">
          <Link href="/movies/form">
            <button className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">Add New Movie</button>
          </Link>
        </div>
        <ul className="space-y-8">
          {movies.map((movie) => (
            <li key={movie.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{movie.title}</h2>
                <p className="text-gray-600 mb-4">{movie.summary}</p>
                <p className="text-gray-700 mb-4">
                  <span className="font-medium">Director:</span> {movie.director}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {movie.genres.map((genre) => (
                    <span key={genre.id} className="px-3 py-1 bg-indigo-100 text-indigo-600 text-sm font-medium rounded-full">
                      {genre.name}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <Link href={`/movies/form?id=${movie.id}`}>
                    <button className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600">Edit</button>
                  </Link>
                  <Link href={`/movies/detail?id=${movie.id}`}>
                    <button className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">Detail</button>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
