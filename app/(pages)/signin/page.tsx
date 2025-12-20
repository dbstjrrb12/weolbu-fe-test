'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { isAxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import AuthQueryHelper from '../../(domains)/shared/api/query/auth';
import signinSchema, {
  type SigninSchema,
} from '../../(domains)/signin/schema/signin';
import MobileHeader from '../../(domains)/shared/components/MobileHeader';
import MobileLayout from '../../(domains)/shared/components/MobileLayout';
import Form from '../../(domains)/shared/components/Form';
import { setClientCookie } from '../../(domains)/shared/utils/cookie/clientCookieHelper';
import { SESSION_COOKIE_NAME } from '../../(domains)/shared/constants/auth';
import CTAButtons from '../../(domains)/shared/components/CTAButtons';
import useToast from '@/app/(domains)/shared/components/hooks/useToast';

export default function SigninPage() {
  const { showToast } = useToast();
  const { back, replace } = useRouter();

  const { mutate: signin, isPending } = useMutation(
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signinSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const submit = async (signInData: SigninSchema) => {
    signin(signInData);
  };

  return (
    <MobileLayout
      header={
        <MobileHeader
          left={<MobileHeader.Back onClick={back} />}
          title="로그인"
        />
      }
      content={
        <Form>
          <Form.Input
            label="이메일"
            placeholder="이메일을 입력해주세요"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email')}
          />
          <Form.Input
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register('password')}
          />
        </Form>
      }
      footer={
        <CTAButtons
          mainText="로그인"
          mainProps={{
            type: 'submit',
            loading: isPending,
            onClick: handleSubmit(submit),
          }}
          subText="회원가입"
          subProps={{
            onClick: () => {
              replace('/signup');
            },
          }}
        />
      }
    />
  );
}
