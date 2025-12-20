export interface Session {
  accessToken: string;
  tokenType: 'Bearer';
  user: {
    id: number;
    email: string;
    name: string;
    phone: string;
    role: 'STUDENT' | 'INSTRUCTOR';
  };
}
