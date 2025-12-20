import type { UseMutationOptions } from '@tanstack/react-query';

import AuthApi from '../auth';
import type {
  SignInResponse,
  SignUpResponse,
  SigninRequest,
  SignupRequest,
} from '../../types/api';

const AuthQueryHelper = {
  signup: (
    options?: UseMutationOptions<SignUpResponse, Error, SignupRequest>,
  ) => ({
    mutationKey: ['signup'],
    mutationFn: async (data: SignupRequest) => {
      const response = await AuthApi.signup(data);
      return response.data;
    },
    ...options,
  }),
  signin: (
    options?: UseMutationOptions<SignInResponse, Error, SigninRequest>,
  ) => ({
    mutationKey: ['signin'],
    mutationFn: async (data: SigninRequest) => {
      const response = await AuthApi.signin(data);
      return response.data;
    },
    ...options,
  }),
};

export default AuthQueryHelper;
