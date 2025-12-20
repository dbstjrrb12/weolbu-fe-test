'use client';

import { useRouter } from 'next/navigation';

import MobileLayout from '../../../(domains)/shared/components/MobileLayout';
import MobileHeader from '../../../(domains)/shared/components/MobileHeader';
import List from '@/app/(domains)/shared/components/ui/List';
import ClassQueryHelper from '@/app/(domains)/shared/api/query/class';
import { useInfiniteQuery } from '@tanstack/react-query';
import CourseCard from '@/app/(domains)/class/components/list/CourseCard';
import Observer from '@/app/(domains)/shared/components/Observer';

export default function ClassListPage() {
  const { back } = useRouter();

  const {
    data: courses,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery(ClassQueryHelper.getCourses('recent'));

  const handleIntersect = () => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  };

  return (
    <MobileLayout title="수강 목록" left={<MobileHeader.Back onClick={back} />}>
      <List className="gap-2">
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
    </MobileLayout>
  );
}
