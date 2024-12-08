"use client";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { MovieRequest } from "../../interfaces/movie";
import { Genre } from "../../interfaces/genre";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

const CreateEditMovie = () => {
  const [title, setTitle] = useState<string>("");
  const [director, setDirector] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [genres, setGenres] = useState<number[]>([]);
  const [allGenres, setAllGenres] = useState<Genre[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const movieId = searchParams.get("id");

  useEffect(() => {
    api
      .get("/genres")
      .then((response) => {
        setAllGenres(response.data);
      })
      .catch((err) => console.error("Error fetching genres:", err));

      if (movieId) {
        api
          .get(`/movies/${movieId}`)
          .then((response) => {
            const movie = response.data;
            setTitle(movie.title || "");
            setDirector(movie.director || "");
            setSummary(movie.summary || "");
            setGenres(movie.genres.map((genre: Genre) => genre.id));
          })
          .catch((err) => console.error("Error fetching movie:", err));
      }
  }, [movieId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const movie: MovieRequest = { title, director, summary, genresIds: genres };

    try {
      if (movieId) {
        await api.put(`/movies/${movieId}`, movie);
        toast.success("Movie updated successfully!");
      } else {
        await api.post("/movies", movie);
        toast.success("Movie created successfully!");
      }
      router.push("/");
    } catch (err) {
      console.error("Error creating/updating movie:", err);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleCheckboxChange = (id: number) => {
    if (genres.includes(id)) {
      setGenres(genres.filter((genreId) => genreId !== id));
    } else {
      setGenres([...genres, id]);
    }
  };

  const filterGenre = (genreId: number) => {
    console.log(genres)
    return genres.includes(genreId);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">{movieId ? "Edit Movie" : "Create Movie"}</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter movie title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition ease-in-out"
            />
          </div>
          <div>
            <label htmlFor="director" className="block text-sm font-medium text-gray-700">
              Director
            </label>
            <input
              id="director"
              type="text"
              placeholder="Enter director's name"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
              className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition ease-in-out"
            />
          </div>
          <div>
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
              Summary
            </label>
            <textarea
              id="summary"
              placeholder="Write a short summary"
              maxLength={100}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition ease-in-out"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700">Genres</h3>
            <div className="mt-2 grid grid-cols-2 gap-6">
              {allGenres.map((genre) => (
                <div key={genre.id} className="flex items-center">
                  <input type="checkbox" id={`genre-${genre.id}`} checked={filterGenre(genre.id)} onChange={() => handleCheckboxChange(genre.id)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label htmlFor={`genre-${genre.id}`} className="ml-2 text-sm text-gray-700">
                    {genre.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex space-x-4">
            <button type="submit" className={`w-full py-2 px-4 rounded-md text-white font-medium ${movieId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"}`}>
              {movieId ? "Update" : "Save"}
            </button>
            <Link href="/">
              <button type="button" className="w-full py-2 px-4 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEditMovie;
