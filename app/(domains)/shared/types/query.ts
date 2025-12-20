import type { QueryKey, UseInfiniteQueryOptions } from '@tanstack/react-query';
import type { GetCoursesResponse } from './api';
import type { Course } from './class';

export type GetCoursesQueryOptions = Omit<
  UseInfiniteQueryOptions<
    GetCoursesResponse,
    Error,
    Course[],
    QueryKey,
    number
  >,
  'queryKey' | 'queryFn' | 'getNextPageParam' | 'initialPageParam' | 'select'
>;
