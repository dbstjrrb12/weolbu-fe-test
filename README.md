# 월부 프론트엔드 과제

온라인 수강 신청 시스템 구현 과제

## 기술 스택

- **Framework**: Next.js 16.1.0 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **State Management**: TanStack Query (React Query) v5
- **Form**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Package Manager**: pnpm 9.15.0

## 실행 방법

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

```

개발 서버: http://localhost:3000

## 구현 기능

### 1. 인증

- **회원가입** (`/signup`)
  - 이메일, 비밀번호, 이름, 전화번호, 역할(학생/강사) 입력
  - Zod 스키마 기반 유효성 검증
  - 가입 성공 시 자동 로그인 및 리다이렉트

- **로그인** (`/signin`)
  - 이메일/비밀번호 인증
  - 세션 쿠키 기반 인증 상태 관리
  - 로그인 시 수강 목록으로 자동 이동

### 2. 수강 목록 (`/class/list`)

- 강좌 목록 조회 (무한 스크롤)
- 정렬 기능: 최신순 / 인기순 / 신청률순
- 수강 신청 (다중 선택 가능)
- 마감된 강좌 선택 방지
- 강사는 "등록하기" 버튼으로 강좌 등록 페이지 접근 가능
- 로그아웃 기능

### 3. 강좌 등록 (`/class/regist`)

- 강의명, 강의설명, 강사명, 수강인원, 가격 입력
- 강사 계정만 접근 가능 (미들웨어 보호)
- 실시간 가격 포맷팅
- 등록 성공 시 수강 목록 캐시 무효화 및 리다이렉트

## 아키텍처 특징

### 도메인 기반 설계

```
app/
├── (domains)/     # 비즈니스 로직 (라우팅과 무관)
│   ├── class/    # 수강 도메인
│   ├── shared/   # 공통 로직
│   ├── signin/   # 로그인 도메인
│   └── signup/   # 회원가입 도메인
└── (pages)/      # 라우트 정의
    ├── class/list
    ├── class/regist
    ├── signin
    └── signup
```

**설계 의도:**

- `(domains)`: 재사용 가능한 비즈니스 로직, 컴포넌트, API, 타입 등 관리
- `(pages)`: 실제 라우트만 정의, 페이지 컴포넌트는 도메인 로직을 조합
- `shared`: 도메인 간 공유되는 로직 중앙화

### 주요 개발 사항

**1. 인증 플로우**

- 쿠키 기반 세션 관리 (`weolbu-session-cookie`)
- Axios 인터셉터로 자동 Authorization 헤더 주입
- Next.js 미들웨어로 라우트 보호:
  - 미인증 사용자 → `/signin` 리다이렉트
  - 인증된 사용자가 로그인 페이지 접근 → `/class/list` 리다이렉트
  - 학생이 강좌 등록 페이지 접근 → `/class/list` 리다이렉트

**2. React Query 패턴**

- Query Helper 패턴: 쿼리/뮤테이션 옵션을 반환하는 헬퍼 함수
- 중앙화된 API 레이어 (`shared/api/`)와 쿼리 헬퍼 (`shared/api/query/`)

**3. 폼 관리**

- React Hook Form + Zod로 선언적 폼 관리
- 도메인별 스키마 분리 (`schema/` 폴더)
- 실시간 유효성 검증 (`mode: 'onChange'`)

**4. 컴포넌트 구조**

- `shared/components/ui/`: 재사용 가능한 UI 프리미티브
- `MobileLayout` + `MobileHeader`: 일관된 모바일 레이아웃
- `Form` 컴포넌트로 폼 레이아웃 통일
- Compound Component 패턴 활용

**5. 타입 안정성**

- API 응답 타입 중앙 관리 (`shared/types/api.ts`)
- 도메인별 비즈니스 타입 분리
- Zod 스키마에서 TypeScript 타입 추론

## 프로젝트 구조

```
├── app/
│   ├── (domains)/
│   │   └── shared/
│   │       ├── api/              # API 호출 함수
│   │       │   └── query/        # React Query 헬퍼
│   │       ├── components/       # 공통 컴포넌트
│   │       │   ├── ui/          # UI 프리미티브
│   │       │   └── providers/   # Context Providers
│   │       ├── constants/        # 상수
│   │       ├── hooks/           # 커스텀 훅
│   │       ├── types/           # TypeScript 타입
│   │       └── utils/           # 유틸리티 함수
│   ├── (pages)/                 # 라우트 페이지
│   ├── layout.tsx               # 루트 레이아웃
│   └── Provider.tsx             # 전역 프로바이더
├── middleware.ts                # 인증 미들웨어
└── tailwind.config.ts          # Tailwind 설정
```
