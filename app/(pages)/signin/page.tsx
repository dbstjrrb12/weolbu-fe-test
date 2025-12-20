'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import signinSchema, {
  type SigninSchema,
} from '../../(domains)/signin/schema/signin';
import MobileHeader from '../../(domains)/shared/components/MobileHeader';
import MobileLayout from '../../(domains)/shared/components/MobileLayout';
import Form from '../../(domains)/shared/components/Form';
import CTAButtons from '../../(domains)/shared/components/CTAButtons';
import useLogin from '@/app/(domains)/shared/hooks/useLogin';

export default function SigninPage() {
  const { push } = useRouter();

  const { mutate: signin, isPending } = useLogin();

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
      header={<MobileHeader title="로그인" />}
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
              push('/signup');
            },
          }}
        />
      }
    />
  );
}
