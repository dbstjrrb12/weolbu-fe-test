'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { isAxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import AuthQueryHelper from '../../(domains)/shared/api/query/auth';
import signupSchema, {
  type SignupSchema,
} from '../../(domains)/signup/schema/signup';
import MobileHeader from '../../(domains)/shared/components/MobileHeader';
import MobileLayout from '../../(domains)/shared/components/MobileLayout';
import Form from '../../(domains)/shared/components/Form';
import { setClientCookie } from '../../(domains)/shared/utils/cookie/clientCookieHelper';
import { SESSION_COOKIE_NAME } from '../../(domains)/shared/constants/auth';
import CTAButtons from '../../(domains)/shared/components/ui/CTAButtons';

export default function SignupPage() {
  const { back, replace } = useRouter();

  const { mutate: signin } = useMutation(
    AuthQueryHelper.signin({
      onSuccess: (data) => {
        setClientCookie(SESSION_COOKIE_NAME, JSON.stringify(data));
        replace('/class/list');
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          const data = error.response?.data;
          window.alert(data.message);
        }
      },
    }),
  );

  const { mutate: signup, isPending } = useMutation(
    AuthQueryHelper.signup({
      onError: (error) => {
        if (isAxiosError(error)) {
          const data = error.response?.data;
          window.alert(data.message);
        }
      },
    }),
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      name: '',
      phone: '',
      role: 'STUDENT' as const,
    },
  });

  const submit = async (signUpData: SignupSchema) => {
    signup(signUpData, {
      onSuccess: (data) => {
        console.log(data);
        if (data) {
          signin({ email: data.email, password: signUpData.password });
        }
      },
    });
  };

  return (
    <MobileLayout
      header={
        <MobileHeader
          left={<MobileHeader.Back onClick={back} />}
          title="회원가입"
        />
      }
      content={
        <Form onSubmit={handleSubmit(submit)}>
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
          <Form.Input
            label="이름"
            placeholder="이름을 입력해주세요"
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register('name')}
          />
          <Form.Input
            label="전화번호"
            placeholder="전화번호를 입력해주세요"
            error={!!errors.phone}
            helperText={errors.phone?.message}
            {...register('phone')}
          />
          <Form.Select
            label="회원 유형"
            options={[
              { value: 'STUDENT', label: '학생' },
              { value: 'INSTRUCTOR', label: '강사' },
            ]}
            error={!!errors.role}
            helperText={errors.role?.message}
            {...register('role')}
          />
        </Form>
      }
      footer={
        <CTAButtons
          mainText="회원가입"
          mainProps={{
            type: 'submit',
            loading: isPending,
            onClick: handleSubmit(submit),
          }}
        />
      }
    />
  );
}
