import type { AxiosResponse } from 'axios';

import httpClient from '../utils/httpClient';
import type {
  GetCoursesRequest,
  GetCoursesResponse,
  RegisteCourseRequest,
  RegisteCourseResponse,
} from '../types/api';

const ClassApi = {
  getCourses: async (
    data: GetCoursesRequest,
  ): Promise<AxiosResponse<GetCoursesResponse>> => {
    const { page = 0, size = 10, sort = 'recent' } = data ?? {};

    return httpClient.get(
      `/api/courses?page=${page}&size=${size}&sort=${sort}`,
    );
  },
  registeCourse: async (
    data: RegisteCourseRequest,
  ): Promise<AxiosResponse<RegisteCourseResponse>> => {
    return httpClient.post('/api/courses', data);
  },
};

export default ClassApi;
