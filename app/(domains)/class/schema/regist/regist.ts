import { toNumber } from '@/app/(domains)/shared/utils/common';
import { z } from 'zod';

const classRegisterSchema = z.object({
  title: z.string().min(1, { message: '클래스 이름은 필수입니다' }),
  description: z.string().transform((v) => v?.trim()),
  instructorName: z.string().min(1, { message: '강사 이름은 필수입니다' }),
  maxStudents: z
    .string()
    .min(1, '값을 입력해주세요')
    .regex(/^\d+$/, '숫자만 입력해주세요')
    .transform((v) => toNumber(v))
    .refine((n) => n > 0, '0보다 큰 값만 입력해주세요'),
  price: z
    .string()
    .min(1, '값을 입력해주세요')
    .transform((v) => toNumber(v))
    .refine((n) => n >= 0, '0 이상의 값만 입력해주세요'),
});

export type ClassRegisterSchema = z.infer<typeof classRegisterSchema>;

export default classRegisterSchema;
