import axios from 'axios';

import { BASE_API_URL } from '../constants/common';
import SessionHelper from './sessionHelper';

const httpClient = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use((config) => {
  const session = SessionHelper.getSession();

  if (session?.accessToken) {
    config.headers.Authorization = `${session.tokenType ?? 'Bearer'} ${session.accessToken}`;
  }

  return config;
});

export default httpClient;
