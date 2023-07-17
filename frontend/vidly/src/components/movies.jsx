import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieServices";
import { getGenres } from "../services/genreServices";
import { toast } from "react-toastify";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";
import _ from "lodash";
import SearchBox from "./searchBox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: { name: "All Genres" },
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
  };

  async componentDidMount() {
    const { data: allGenres } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...allGenres];
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  getPagedData = () => {
    const {
      currentPage,
      searchQuery,
      pageSize,
      movies: allMovies,
      selectedGenre,
      sortColumn,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
    }
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      searchQuery,
      currentPage,
      pageSize,
      genres,
      selectedGenre,
      sortColumn,
    } = this.state;
    const { user } = this.props;
    const { totalCount, data: movies } = this.getPagedData();

    if (count === 0) return <h1>There are no movies in the database.</h1>;

    return (
      <div className="flex justify-center items-center h-full">
        <div className="mr-4 mb-[105px]">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div>
          {user && (
            <Link
              to="/movies/new"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              New Movie
            </Link>
          )}
          <h1 className="m-2 ml-0">
            Showing {totalCount} movies in the database.
          </h1>
          <SearchBox onChange={this.handleSearch} value={searchQuery} />
          <MoviesTable
            movies={movies}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      selectedGenre: { name: "All Genres" },
      currentPage: 1,
    });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleDelete = async (selectedMovie) => {
    const originalMovies = this.state.movies;
    const movies = this.state.movies.filter((movie) => movie !== selectedMovie);
    this.setState({ movies });

    try {
      await deleteMovie(selectedMovie._id);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        toast.err("This movie has already been deleted.");
      }
      this.setState({ movies: originalMovies });
    }
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
}

export default Movies;
