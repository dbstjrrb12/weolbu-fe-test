export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  phone: string;
  role: 'STUDENT' | 'INSTRUCTOR';
}

export interface SignUpResponse {
  id: number;
  email: string;
  name: string;
  phone: string;
  role: 'STUDENT' | 'INSTRUCTOR';
  message: string;
}

export type SignUpErrorCode = 'G001' | 'U001';

export interface SignUpError {
  code: SignUpErrorCode;
  message: string;
}
