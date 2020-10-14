import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, Route, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import UpdateMovie from "./UpdateMovie"

function Movie(props) {
  const { addToSavedList, movie, fetchMovie } = props

  const { push } = useHistory();


  const params = useParams();

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  const saveMovie = () => {
    addToSavedList(movie);
  };

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = function(id) {
    axios.delete(`http://localhost:5000/api/movies/${id}`)
    .then(res => {
      push("/");
      window.location.reload();
    })
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <Link key={movie.id} to={`/movie/${movie.id}`}>Update</Link>

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <br/>
      <button onClick={() => deleteMovie(movie.id)} >Delete</button>

    </div>
  );
}

export default Movie;
