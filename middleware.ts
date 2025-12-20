import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
} from 'next/server';
import { getServerCookie } from './app/(domains)/shared/utils/cookie/serverCookieHelper';
import { SESSION_COOKIE_NAME } from './app/(domains)/shared/constants/auth';
import { Session } from './app/(domains)/shared/types/auth';

const withAuthRoutes = ['/class/list', '/class/regist'];
const withoutAuthRoutes = ['/signup'];

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const session = await getServerCookie(SESSION_COOKIE_NAME);
  const parsedSession = session ? (JSON.parse(session) as Session) : null;
  const role = parsedSession?.user?.role || null;

  const requestUrl = request.nextUrl.pathname;

  if (!session && withAuthRoutes.includes(requestUrl)) {
    return NextResponse.redirect(new URL('/signup', request.url));
  }

  if (session && withoutAuthRoutes.includes(requestUrl)) {
    return NextResponse.redirect(new URL('/class/list', request.url));
  }

  if (role === 'STUDENT' && requestUrl === '/class/regist') {
    return NextResponse.redirect(new URL('/class/list', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * 아래 항목을 제외한 모든 경로에 대해 미들웨어를 실행합니다:
     * - api 경로 (API Routes)
     * - _next/static (Next.js 정적 파일)
     * - _next/image (Next.js 이미지 최적화 파일)
     * - favicon.ico, sitemap.xml 등 정적 파일
     * - /public 폴더의 정적 파일 (예: .png, .jpg, .svg)
     * * 미들웨어는 페이지 로드와 관련된 요청(/, /posts, /profile 등)에만 실행됩니다.
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp)$).*)',
  ],
};
