import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import UpdateMovie from "./UpdateMovie";

function MovieList({ movies }) {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div>
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default MovieList;
