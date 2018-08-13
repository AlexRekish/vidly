import http from './httpService';
import { apiEndpoint } from '../config.json';

const genreEndpoint = `${apiEndpoint}/genres`;

export const getGenres = () => {
  return http.get(genreEndpoint);
};
