import httpClient from '../utils/httpClient';

import type { SignupRequest, SignUpResponse } from '../types/api';
import { AxiosResponse } from 'axios';

const AuthApi = {
  signup: async (
    data: SignupRequest,
  ): Promise<AxiosResponse<SignUpResponse>> => {
    return httpClient.post('/api/users/signup', data);
  },
};

export default AuthApi;
