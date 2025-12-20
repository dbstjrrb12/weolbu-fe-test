import type { Session } from '../types/auth';

const SessionHelper = {
  getSession: (): Session => {
    // TODO: 쿠키에서 세션 참조 구현
    return {
      accessToken: '',
      tokenType: 'Bearer',
      user: {
        id: 1,
        email: 'user@example.com',
        name: '홍길동',
        phone: '010-1234-5678',
        role: 'STUDENT',
      },
    };
  },
};

export default SessionHelper;
