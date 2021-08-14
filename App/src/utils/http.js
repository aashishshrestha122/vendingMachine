import axios from 'axios';

import config from '../config';

/**
 * Http Utility.
 */
const http = axios.create({
  baseURL: `${config.SERVER_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
});

const refreshTokenHttp = axios.create({
  baseURL: `${config.SERVER_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
});

export { http as default, refreshTokenHttp };
