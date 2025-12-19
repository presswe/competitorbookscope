# 📦 GitHub 업로드 체크리스트

## ✅ 업로드할 파일 목록

### 필수 파일
- [x] `package.json` - 프로젝트 의존성
- [x] `package-lock.json` - 의존성 버전 고정
- [x] `tsconfig.json` - TypeScript 설정
- [x] `next.config.ts` - Next.js 설정
- [x] `eslint.config.mjs` - ESLint 설정
- [x] `.gitignore` - Git 제외 파일 목록
- [x] `README.md` - 프로젝트 설명
- [x] `DEPLOY.md` - 배포 가이드
- [x] `SECURITY.md` - 보안 가이드
- [x] `.env.example` - 환경 변수 템플릿

### 소스 코드
- [x] `app/` - Next.js App Router 파일
  - [x] `app/page.tsx`
  - [x] `app/layout.tsx`
  - [x] `app/globals.css`
  - [x] `app/page.module.css`
  - [x] `app/favicon.ico`
  - [x] `app/api/books/route.ts`
- [x] `components/` - React 컴포넌트
  - [x] 모든 `.tsx` 파일
  - [x] 모든 `.module.css` 파일
- [x] `lib/` - 라이브러리 및 유틸리티
  - [x] `lib/aladin-client.ts`
  - [x] `lib/constants.ts`
  - [x] `lib/hooks/useDraggableScroll.ts`
- [x] `public/` - 정적 파일
  - [x] `public/medal-*.svg` (메달 아이콘)
  - [x] 기타 SVG 파일들

## ❌ 업로드하지 말아야 할 파일

### 환경 변수 (자동 제외됨)
- [ ] `.env.local` - **절대 업로드 금지!**
- [ ] `.env`
- [ ] `.env.production`

### 빌드 파일 (자동 제외됨)
- [ ] `node_modules/` - npm 패키지
- [ ] `.next/` - Next.js 빌드 결과
- [ ] `out/` - 정적 빌드 결과
- [ ] `.vercel/` - Vercel 설정

### 테스트/임시 파일 (자동 제외됨)
- [ ] `output.txt`
- [ ] `test-api.js`
- [ ] `discover_categories.js`

### 시스템 파일 (자동 제외됨)
- [ ] `.DS_Store` - macOS 시스템 파일
- [ ] `*.log` - 로그 파일

## 🔍 업로드 전 최종 확인

### 1. API 키 확인
```bash
# API 키가 코드에 하드코딩되어 있는지 확인
grep -r "ttblms" . --exclude-dir=node_modules --exclude-dir=.git
# 결과가 비어있어야 함!
```

### 2. .env 파일 확인
```bash
# .env 파일이 커밋에 포함되는지 확인
git ls-files | grep "\.env"
# .env.example만 나와야 함!
```

### 3. 커밋할 파일 목록 확인
```bash
git status
git diff --cached --name-only
```

## 📋 업로드 순서

1. ✅ 모든 파일이 스테이징되었는지 확인
2. ✅ API 키가 포함되지 않았는지 확인
3. ✅ 커밋 메시지 작성
4. ✅ GitHub 저장소 생성
5. ✅ 원격 저장소 연결
6. ✅ 푸시

## 🚨 문제 발생 시

만약 실수로 API 키를 업로드했다면:
1. 즉시 GitHub에서 해당 커밋 삭제
2. 알라딘에서 API 키 재발급
3. 새 API 키로 `.env.local` 업데이트

