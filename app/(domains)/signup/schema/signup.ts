import { z } from 'zod';

const signupSchema = z.object({
  email: z
    .email({ message: '올바른 이메일 형식이 아닙니다' })
    .min(1, { message: '이메일은 필수입니다' }),
  password: z
    .string()
    .regex(/^(?=.*[a-zA-Z])(?=.*\d).+$/, {
      message: '비밀번호는 영문과 숫자를 모두 포함해야 합니다',
    })
    .min(6, { message: '비밀번호는 6자 이상이어야 합니다' })
    .max(10, { message: '비밀번호는 10자 이하여야 합니다' }),
  name: z.string().min(1, { message: '이름은 필수입니다' }),
  phone: z
    .string()
    .min(1, { message: '전화번호는 필수입니다' })
    .regex(/^01[016789]-\d{3,4}-\d{4}$/, {
      message: '올바른 전화번호 형식이 아닙니다',
    })
    .trim(),
  role: z.enum(['STUDENT', 'INSTRUCTOR'], {
    message: '회원 유형은 STUDENT 또는 INSTRUCTOR만 가능합니다',
  }),
});

export type SignupSchema = z.infer<typeof signupSchema>;

export default signupSchema;
