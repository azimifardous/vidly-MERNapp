import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { saveMovie, getMovie } from "../services/movieServices";
import { getGenres } from "../services/genreServices";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.required().label("Genre"),
    numberInStock: Joi.number()
      .integer()
      .min(0)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Daily Rental Rate"),
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (err) {
      if (err.response && err.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="w-full h-full flex flex-col justify-center items-center"
      >
        <h1 className="mb-10 text-2xl font-bold">Movie Form</h1>
        {this.renderInput("title", "Title")}
        {this.renderSelect("genreId", "Genre", this.state.genres)}
        {this.renderInput("numberInStock", "Number in Stock", "number")}
        {this.renderInput("dailyRentalRate", "Rate")}
        {this.renderButton("Save")}
      </form>
    );
  }
}

export default MovieForm;
