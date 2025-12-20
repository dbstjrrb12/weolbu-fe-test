import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import AuthQueryHelper from '../api/query/auth';
import { SESSION_COOKIE_NAME } from '../constants/auth';
import { setClientCookie } from '../utils/cookie/clientCookieHelper';
import useToast from '@/app/(domains)/shared/components/hooks/useToast';

export default function useLogin() {
  const { showToast } = useToast();
  const { replace } = useRouter();

  return useMutation(
    AuthQueryHelper.signin({
      onSuccess: (data) => {
        setClientCookie(SESSION_COOKIE_NAME, JSON.stringify(data));
        replace('/class/list');
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          const data = error.response?.data;
          showToast(data?.message || '로그인에 실패했습니다');
        }
      },
    }),
  );
}
