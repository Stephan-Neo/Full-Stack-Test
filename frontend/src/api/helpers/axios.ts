import axios from 'axios';
import environments from '../../config/environments';

const instance = axios.create({
  baseURL: environments.baseApiUrl,
});

export default instance;
