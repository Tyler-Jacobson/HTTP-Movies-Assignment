import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const initialNewMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const NewMovie = (props) => {
  const { setMovieList } = props;

  const [newMovie, setNewMovie] = useState(initialNewMovie);

  const { push } = useHistory();

  const createNewMovie = function (e) {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/movies", newMovie)
      .then((res) => {
        console.log("RES", res);
        setMovieList(res.data);
        push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setNewMovie({
      ...newMovie,
      [e.target.name]: e.target.value,
    });
  };

  const handleArrayChange = (e) => {
    const newE = e.target.value.split(",");
    setNewMovie({
      ...newMovie,
      [e.target.name]: newE,
    });
  };

  return (
    <form onSubmit={createNewMovie} className="update-form">
      <span>Title: </span>
      <input
        type="text"
        name="title"
        value={newMovie.title}
        onChange={handleChange}
      />
      <br />
      <span>Director: </span>
      <input
        type="text"
        name="director"
        value={newMovie.director}
        onChange={handleChange}
      />
      <br />
      <span>Metascore: </span>
      <input
        type="text"
        name="metascore"
        value={newMovie.metascore}
        onChange={handleChange}
      />
      <br />
      <span>Stars (Comma seperated): </span>
      <input
        type="text"
        name="stars"
        value={newMovie.stars}
        onChange={handleArrayChange}
      />
      <br />
      <button>Submit</button>
    </form>
  );
};
export default NewMovie;
