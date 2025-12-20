import { AxiosResponse } from 'axios';
import httpClient from '../utils/httpClient';

import type {
  SigninRequest,
  SignupRequest,
  SignUpResponse,
  SignInResponse,
} from '../types/api';

const AuthApi = {
  signup: async (
    data: SignupRequest,
  ): Promise<AxiosResponse<SignUpResponse>> => {
    return httpClient.post('/api/users/signup', data);
  },
  signin: async (
    data: SigninRequest,
  ): Promise<AxiosResponse<SignInResponse>> => {
    return httpClient.post('/api/users/login', data);
  },
};

export default AuthApi;
