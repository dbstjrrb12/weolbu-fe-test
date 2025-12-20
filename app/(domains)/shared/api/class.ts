import type { AxiosResponse } from 'axios';

import httpClient from '../utils/httpClient';
import type { GetCoursesRequest, GetCoursesResponse } from '../types/api';

const ClassApi = {
  getCourses: async (
    data: GetCoursesRequest,
  ): Promise<AxiosResponse<GetCoursesResponse>> => {
    const { page = 0, size = 10, sort = 'recent' } = data ?? {};

    return httpClient.get(
      `/api/courses?page=${page}&size=${size}&sort=${sort}`,
    );
  },
};

export default ClassApi;
