import http from './httpService';
import _ from 'lodash';
import { apiEndpoint } from '../config.json';

const moviesEndpoint = `${apiEndpoint}/movies`;

export const getMovies = () => {
  return http.get(moviesEndpoint);
};

export const getMovie = (id) => {
  return http.get(`${moviesEndpoint}/${id}`);
};

export const saveMovie = (movie) => {
  let savedMovie = _.pick(movie, ['title', 'genreId', 'dailyRentalRate', 'numberInStock']);

  if (!movie._id) return http.post(moviesEndpoint, movie);
  return http.put(`${moviesEndpoint}/${movie._id}`, savedMovie);

}

export const deleteMovie = (id) => {
  return http.delete(`${moviesEndpoint}/${id}`);
}



