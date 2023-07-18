import httpService from './httpService';

const apiEndpoint = "/movies";

function movieUrl(movieId) {
    return `${apiEndpoint}/${movieId}`;
}

function getMovies() {
    return httpService.get(apiEndpoint);
}

function deleteMovie(movieID) {
    return httpService.delete(movieUrl(movieID))
}

function getMovie(movieID) {
    return httpService.get(movieUrl(movieID));
}

function saveMovie(movie) {
    if (movie._id) {
        const body = { ...movie };
        delete body._id;
        return httpService.put(movieUrl(movie._id), body);
    }

    return httpService.post(apiEndpoint, movie);
}

export {
    getMovies,
    deleteMovie,
    getMovie,
    saveMovie
}
