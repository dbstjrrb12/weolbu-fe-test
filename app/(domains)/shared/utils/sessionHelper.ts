import { SESSION_COOKIE_NAME } from '../constants/auth';
import type { Session } from '../types/auth';
import { getClientCookie } from './cookie/clientCookieHelper';

const SessionHelper = {
  getSession: (): Session | null => {
    const session = getClientCookie(SESSION_COOKIE_NAME);

    return session ? (JSON.parse(session) as Session) : null;
  },
  getAccessToken: (): string | null => {
    const session = SessionHelper.getSession();
    return session?.accessToken || null;
  },
  getRole: (): string | null => {
    const session = SessionHelper.getSession();
    return session?.user.role || null;
  },
};

export default SessionHelper;
