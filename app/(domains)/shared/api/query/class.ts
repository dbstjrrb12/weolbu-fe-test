import type { InfiniteData, UseMutationOptions } from '@tanstack/react-query';

import ClassApi from '../class';
import type { GetCoursesQueryOptions } from '../../types/query';
import type {
  CourseSort,
  EnrollCoursesRequest,
  EnrollCoursesResponse,
  GetCoursesResponse,
  RegisteCourseRequest,
  RegisteCourseResponse,
} from '../../types/api';

const ClassQueryHelper = {
  getCourses: (
    sort: CourseSort = 'recent',
    options?: GetCoursesQueryOptions,
  ) => ({
    initialPageParam: 0,
    queryKey: ['courses', sort],
    queryFn: async ({ pageParam = 0 }: { pageParam?: number }) => {
      const response = await ClassApi.getCourses({
        page: pageParam,
        size: 10,
        sort,
      });

      return response.data;
    },
    getNextPageParam: (lastPage: GetCoursesResponse) => {
      return lastPage.last ? undefined : lastPage.pageable.pageNumber + 1;
    },
    select: (data: InfiniteData<GetCoursesResponse>) => {
      return data.pages.flatMap((page) => page.content);
    },
    ...options,
  }),
  registeCourse: (
    options?: UseMutationOptions<
      RegisteCourseResponse,
      Error,
      RegisteCourseRequest
    >,
  ) => ({
    mutationKey: ['registeCourse'],
    mutationFn: async (data: RegisteCourseRequest) => {
      const response = await ClassApi.registeCourse(data);
      return response.data;
    },
    ...options,
  }),
  enrollCourses: (
    options?: UseMutationOptions<
      EnrollCoursesResponse,
      Error,
      EnrollCoursesRequest
    >,
  ) => ({
    mutationKey: ['enrollCourses'],
    mutationFn: async (data: EnrollCoursesRequest) => {
      const response = await ClassApi.enrollCourses(data);
      return response.data;
    },
    ...options,
  }),
};

export default ClassQueryHelper;
