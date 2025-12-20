import { useRouter } from 'next/navigation';

import { deleteClientCookie } from '../utils/cookie/clientCookieHelper';
import { SESSION_COOKIE_NAME } from '../constants/auth';

export default function useLogout() {
  const { replace } = useRouter();

  const logout = () => {
    deleteClientCookie(SESSION_COOKIE_NAME);
    replace('/signin');
  };

  return { logout };
}
