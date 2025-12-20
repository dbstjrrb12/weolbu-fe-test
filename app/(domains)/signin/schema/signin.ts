import { z } from 'zod';

const signinSchema = z.object({
  email: z
    .email({ message: '올바른 이메일 형식이 아닙니다' })
    .min(1, { message: '이메일은 필수입니다' }),
  password: z.string().min(1, { message: '비밀번호는 필수입니다' }),
});

export type SigninSchema = z.infer<typeof signinSchema>;

export default signinSchema;
