import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./Movies/UpdateMovie";
import NewMovie from "./Movies/NewMovie"
import axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [movie, setMovie] = useState(null);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => setMovieList(res.data))
      .catch((err) => console.log(err.response));
  };

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/add-movie">
        <NewMovie setMovieList={setMovieList} />
      </Route>

      <Route exact path="/">
        <div className="add-movie">
          <Link to={`/add-movie`}>Add New Movie</Link>
        </div>
        <MovieList movies={movieList} />
      </Route>

      <Route exact path="/movies/:id">
        <Movie
          addToSavedList={addToSavedList}
          movie={movie}
          setMovie={setMovie}
          fetchMovie={fetchMovie}
        />
      </Route>
      <Route exact path="/movie/:id">
        <UpdateMovie
          movie={movie}
          setMovie={setMovie}
          fetchMovie={fetchMovie}
          movieList={movieList}
          setMovieList={setMovieList}
        />
      </Route>
    </>
  );
};

export default App;
