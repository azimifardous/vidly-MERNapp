import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
import auth from "../services/authService";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link className="underline" to={`/movies/${movie._id}`}>
          {movie.title}
        </Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (item) => (
        <Like liked={item.liked} onClick={() => this.props.onLike(item)} />
      ),
    },
  ];

  renderDeleteCol() {
    return {
      key: "delete",
      content: (item) => (
        <button
          onClick={() => this.props.onDelete(item)}
          className="font-medium text-red-500 hover:underline"
        >
          Delete
        </button>
      ),
    };
  }

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.renderDeleteCol());
  }

  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <Table
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
        columns={this.columns}
      />
    );
  }
}

export default MoviesTable;
