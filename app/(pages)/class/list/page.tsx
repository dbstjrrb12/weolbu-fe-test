'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

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

export default function ClassListPage() {
  const [sort, setSort] = useState<CourseSort>('recent');

  const { back } = useRouter();

  const {
    data: courses,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery(ClassQueryHelper.getCourses(sort));

  const handleIntersect = () => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  };

  const handleSortChange = (value: CourseSort) => {
    setSort(value);
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
              <List.Item key={course.id}>
                <CourseCard
                  title={course.title}
                  price={course.price}
                  instructorName={course.instructorName}
                  currentStudents={course.currentStudents}
                  maxStudents={course.maxStudents}
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
          mainProps={{ onClick: () => {} }}
          {...(SessionHelper.getRole() === 'INSTRUCTOR' && {
            subText: '등록하기',
            subProps: { onClick: () => {} },
          })}
        />
      }
    />
  );
}
