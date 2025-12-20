import type { InfiniteData } from '@tanstack/react-query';

import ClassApi from '../class';
import type { GetCoursesQueryOptions } from '../../types/query';
import type { CourseSort, GetCoursesResponse } from '../../types/api';

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
};

export default ClassQueryHelper;
