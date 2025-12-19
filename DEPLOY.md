# 배포 가이드

## GitHub 업로드

### 1. GitHub 저장소 생성

1. [GitHub](https://github.com)에 로그인
2. 우측 상단의 "+" 버튼 클릭 → "New repository"
3. 저장소 이름 입력 (예: `aladin-tracker`)
4. Public 또는 Private 선택
5. **"Initialize this repository with a README"는 체크하지 마세요** (이미 로컬에 저장소가 있음)
6. "Create repository" 클릭

### 2. 로컬 저장소와 GitHub 연결

터미널에서 다음 명령어를 실행하세요:

```bash
# 현재 디렉토리로 이동
cd /Users/ma25007/Desktop/Antigravity/aladin/aladin-tracker

# 모든 변경사항 스테이징
git add .

# 커밋
git commit -m "Initial commit: BookScope - 교육 참고서 추적 대시보드"

# GitHub 저장소 URL을 remote로 추가 (YOUR_USERNAME과 YOUR_REPO_NAME을 실제 값으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 또는 SSH를 사용하는 경우:
# git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git

# main 브랜치로 푸시
git branch -M main
git push -u origin main
```

### 3. GitHub 저장소 확인

브라우저에서 GitHub 저장소 페이지를 열어 파일들이 올라갔는지 확인하세요.

## Vercel 배포

### 1. Vercel 계정 생성 및 로그인

1. [Vercel](https://vercel.com)에 접속
2. "Sign Up" 클릭 → GitHub 계정으로 로그인

### 2. 프로젝트 배포

1. Vercel 대시보드에서 "Add New..." → "Project" 클릭
2. GitHub 저장소 선택 (`aladin-tracker`)
3. "Import" 클릭

### 3. 프로젝트 설정

- **Framework Preset**: Next.js (자동 감지됨)
- **Root Directory**: `./` (기본값)
- **Build Command**: `npm run build` (기본값)
- **Output Directory**: `.next` (기본값)

### 4. 환경 변수 설정

"Environment Variables" 섹션에서 다음을 추가:

- **Name**: `ALADIN_API_KEY`
- **Value**: 알라딘 API 키 (선택사항, 없으면 Mock 데이터 사용)

### 5. 배포 실행

"Deploy" 버튼을 클릭하면 자동으로 빌드 및 배포가 시작됩니다.

### 6. 배포 완료

배포가 완료되면 Vercel이 자동으로 생성한 URL (예: `https://aladin-tracker.vercel.app`)로 접속할 수 있습니다.

## Netlify 배포 (대안)

### 1. Netlify 계정 생성

1. [Netlify](https://www.netlify.com)에 접속
2. GitHub 계정으로 로그인

### 2. 프로젝트 배포

1. "Add new site" → "Import an existing project"
2. GitHub 저장소 선택
3. 빌드 설정:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`

### 3. 환경 변수 설정

Site settings → Environment variables에서 `ALADIN_API_KEY` 추가

### 4. 배포

"Deploy site" 클릭

## 환경 변수 관리

### 로컬 개발

`.env.local` 파일 생성:

```bash
ALADIN_API_KEY=your_api_key_here
```

### 배포 환경

- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Environment Variables

## 트러블슈팅

### 빌드 에러

```bash
# 로컬에서 빌드 테스트
npm run build
```

### 환경 변수 문제

- 환경 변수가 제대로 설정되었는지 확인
- 배포 후 재배포 필요할 수 있음

### API 키 없이 배포

API 키가 없어도 Mock 데이터로 동작하므로 배포는 가능합니다.

