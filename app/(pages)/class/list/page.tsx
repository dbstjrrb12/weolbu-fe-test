'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { useForm, useController } from 'react-hook-form';

import MobileLayout from '../../../(domains)/shared/components/MobileLayout';
import MobileHeader from '../../../(domains)/shared/components/MobileHeader';
import CourseCard from '@/app/(domains)/class/components/list/CourseCard';
import ClassQueryHelper from '@/app/(domains)/shared/api/query/class';
import SortGroup from '@/app/(domains)/shared/components/SortGroup';
import List from '@/app/(domains)/shared/components/ui/List';
import Observer from '@/app/(domains)/shared/components/Observer';
import type { CourseSort } from '@/app/(domains)/shared/types/api';
import CTAButtons from '@/app/(domains)/shared/components/CTAButtons';
import SessionHelper from '@/app/(domains)/shared/utils/sessionHelper';
import { cn } from '@/app/(domains)/shared/utils/common';
import type { Course } from '@/app/(domains)/shared/types/class';
import useToast from '@/app/(domains)/shared/components/hooks/useToast';

interface FormData {
  selectedCourses: Map<number, boolean>;
}

export default function ClassListPage() {
  const [sort, setSort] = useState<CourseSort>('recent');

  const { back, push } = useRouter();

  const { showToast } = useToast();

  const { control, reset, handleSubmit } = useForm<FormData>({
    defaultValues: {
      selectedCourses: new Map(),
    },
  });

  const { field } = useController({
    control,
    name: 'selectedCourses',
  });

  const {
    data: courses,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery(ClassQueryHelper.getCourses(sort));

  const { mutate: enrollCourses, isPending } = useMutation(
    ClassQueryHelper.enrollCourses({
      onSuccess: (data) => {
        if (data.failed.length > 0) {
          showToast('수강신청에 실패한 강좌가 있습니다');
        }

        reset();
      },
    }),
  );

  const handleIntersect = () => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  };

  const handleRegist = () => {
    push('/class/regist');
  };

  const handleSortChange = (value: CourseSort) => {
    setSort(value);
  };

  const handleCourseToggle = (course: Course) => {
    const selectedCourses = new Map(field.value);

    if (course.isFull) {
      showToast('이미 마감된 강좌입니다');
      return;
    }

    if (selectedCourses.has(course.id)) {
      selectedCourses.delete(course.id);
    } else {
      selectedCourses.set(course.id, true);
    }

    field.onChange(selectedCourses);
  };

  const submit = ({ selectedCourses }: FormData) => {
    enrollCourses({ courseIds: Array.from(selectedCourses.keys()) });
  };

  return (
    <MobileLayout
      header={
        <MobileHeader
          left={<MobileHeader.Back onClick={back} />}
          title="수강 목록"
        />
      }
      content={
        <>
          <SortGroup
            name="sort"
            items={[
              { label: '최신순', value: 'recent' },
              { label: '신청자 많은 순', value: 'popular' },
              { label: '신청률 높은 순', value: 'rate' },
            ]}
            defaultValue={sort}
            onChange={handleSortChange}
          />

          <List className="gap-2 mt-4 overflow-y-auto flex-1 h-auto">
            {courses?.map((course) => (
              <List.Item
                key={course.id}
                onClick={() => handleCourseToggle(course)}
                className="cursor-pointer"
              >
                <CourseCard
                  title={course.title}
                  price={course.price}
                  instructorName={course.instructorName}
                  currentStudents={course.currentStudents}
                  maxStudents={course.maxStudents}
                  className={cn({
                    'border-blue-500': field.value.has(course.id),
                  })}
                />
              </List.Item>
            ))}
            <Observer onIntersect={handleIntersect} disabled={isLoading} />
          </List>
        </>
      }
      footer={
        <CTAButtons
          mainText="수강신청"
          mainProps={{
            disabled: field.value.size === 0,
            onClick: handleSubmit(submit),
            loading: isPending,
          }}
          {...(SessionHelper.getRole() === 'INSTRUCTOR' && {
            subText: '등록하기',
            subProps: { onClick: handleRegist },
          })}
        />
      }
    />
  );
}
