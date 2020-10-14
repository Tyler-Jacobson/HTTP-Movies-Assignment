import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const initialFormValues = {
  title: "",
  director: "",
  metascore: "",
};

const UpdateMovie = (props) => {
  // const id = props.movie.id
  const { fetchMovie, movie, setMovie } = props;
  const params = useParams();
  const { id } = params;
  const { push } = useHistory();

  const [formValues, setFormValues] = useState({
    title: movie.title,
    director: movie.director,
    metascore: movie.metascore,
  });

  const createOutput = () => {
    return {
      ...formValues,
      id: id,
      stars: props.movie.stars,
    };
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newOutput = createOutput();

    axios
      .put(`http://localhost:5000/api/movies/${id}`, newOutput)
      .then((res) => {
        console.log("RES", res.data);
        setMovie(res.data);
        push("/");

        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  return (
    <form onSubmit={onSubmit} className="update-form">
      <span>New Title: </span>
      <input
        type="text"
        name="title"
        value={formValues.title}
        onChange={handleChange}
      />
      <br />
      <span>New Director: </span>
      <input
        type="text"
        name="director"
        value={formValues.director}
        onChange={handleChange}
      />
      <br />
      <span>New Metascore: </span>
      <input
        type="text"
        name="metascore"
        value={formValues.metascore}
        onChange={handleChange}
      />
      <br />
      <button>Update Movie</button>
    </form>
  );
};

export default UpdateMovie;
