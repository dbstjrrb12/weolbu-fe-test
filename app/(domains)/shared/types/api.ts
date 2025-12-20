import { Session } from './auth';
import { Course } from './class';

/** Auth API */
export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  phone: string;
  role: 'STUDENT' | 'INSTRUCTOR';
}

export interface SignUpResponse {
  id: number;
  email: string;
  name: string;
  phone: string;
  role: 'STUDENT' | 'INSTRUCTOR';
  message: string;
}

export type SignUpErrorCode = 'G001' | 'U001';

export interface SignUpError {
  code: SignUpErrorCode;
  message: string;
}

export interface SigninRequest {
  email: string;
  password: string;
}

export type SignInResponse = Session;

/** Class API */
export type CourseSort = 'recent' | 'popular' | 'rate';

export interface GetCoursesRequest {
  page: number;
  size: number;
  sort: CourseSort;
}

export interface GetCoursesResponse {
  content: Course[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface RegisteCourseRequest {
  title: string;
  description: string;
  instructorName: string;
  maxStudents: number;
  price: number;
}

export type RegisteCourseResponse = Course;

export interface EnrollCoursesRequest {
  courseIds: number[];
}

interface SuccessEnrollCourse {
  enrollmentId: number;
  courseId: number;
  courseTitle: string;
}

interface FailedEnrollCourse {
  courseId: number;
  reason: string;
}

export interface EnrollCoursesResponse {
  success: SuccessEnrollCourse[];
  failed: FailedEnrollCourse[];
}
