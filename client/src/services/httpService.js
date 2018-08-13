import axios from 'axios';
import { toast } from 'react-toastify';

axios.interceptors.response.use(null, (err) => {
  const expectedError = err.response && err.response.status >= 400 && err.response.status < 500;
  if (!expectedError) {
    toast.error(err.message, err.response);
  }
  return Promise.reject(err);
});

function setJwt(jwt) {
  axios.defaults.headers.common['x-auth-token'] = jwt || '';
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
