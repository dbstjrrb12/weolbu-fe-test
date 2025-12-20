'use client';

import { useRouter } from 'next/navigation';
import { useController, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import classRegisterSchema, {
  type ClassRegisterSchema,
} from '@/app/(domains)/class/schema/regist/regist';
import CTAButtons from '@/app/(domains)/shared/components/CTAButtons';
import Form from '@/app/(domains)/shared/components/Form';
import MobileHeader from '@/app/(domains)/shared/components/MobileHeader';
import MobileLayout from '@/app/(domains)/shared/components/MobileLayout';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatPrice } from '@/app/(domains)/shared/utils/common';
import ClassQueryHelper from '@/app/(domains)/shared/api/query/class';
import useToast from '@/app/(domains)/shared/components/hooks/useToast';

export default function ClassRegisterPage() {
  const queryClient = useQueryClient();

  const { back, push } = useRouter();

  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(classRegisterSchema),
    mode: 'all',
    defaultValues: {
      title: '',
      description: '',
      instructorName: '',
      maxStudents: '',
      price: '',
    },
  });

  const { field } = useController({
    name: 'price',
    control: control,
  });

  const { mutate: registeCourse, isPending } = useMutation(
    ClassQueryHelper.registeCourse({
      onSuccess: () => {
        showToast('강좌 등록에 성공했습니다');
        queryClient.invalidateQueries({ queryKey: ['courses'] });

        push('/class/list');
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          const data = error.response?.data;
          showToast(data?.message ?? '등록에 실패했습니다');
        }
      },
    }),
  );

  const submit = (data: ClassRegisterSchema) => {
    registeCourse(data);
  };

  return (
    <MobileLayout
      header={
        <MobileHeader
          left={<MobileHeader.Back onClick={back} />}
          title="클래스 등록"
        />
      }
      content={
        <Form>
          <Form.Input
            label="강의명"
            placeholder="강의명을 입력해주세요"
            error={!!errors.title}
            helperText={errors.title?.message as string}
            {...register('title')}
          />
          <Form.Input
            label="강의설명(선택)"
            placeholder="강의설 명을 입력해주세요"
            {...register('description')}
          />
          <Form.Input
            label="강사 이름"
            placeholder="강사 이름을 입력해주세요"
            error={!!errors.instructorName}
            helperText={errors.instructorName?.message as string}
            {...register('instructorName')}
          />
          <Form.Input
            label="수강인원"
            inputMode="numeric"
            placeholder="수강인원을 입력해주세요"
            error={!!errors.maxStudents}
            helperText={errors.maxStudents?.message}
            {...register('maxStudents', {
              onChange: (e) => {
                e.target.value = e.target.value.replace(/[^\d]/g, '');
              },
            })}
          />
          <Form.Input
            label="가격"
            inputMode="numeric"
            placeholder="가격을 입력해주세요 (원)"
            error={!!errors.price}
            helperText={errors.price?.message}
            value={formatPrice(field.value)}
            onChange={field.onChange}
          />
        </Form>
      }
      footer={
        <CTAButtons
          mainText="등록하기"
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
