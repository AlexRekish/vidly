import http from './httpService';
import { apiEndpoint } from '../config.json'

const usersEndpoint = `${apiEndpoint}/users`;

export const register = (user) => {
  return http.post(usersEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
};
