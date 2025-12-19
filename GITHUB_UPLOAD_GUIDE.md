# 🚀 GitHub 업로드 가이드

이 폴더는 GitHub에 업로드하기 위해 정리된 파일들입니다.

## ✅ 확인 사항

### 1. API 키 보안 확인
```bash
# API 키가 코드에 포함되어 있는지 확인
grep -r "ttblms" . --exclude-dir=node_modules

# .env 파일이 있는지 확인 (있으면 안 됨!)
find . -name ".env*" -not -name ".env.example"
```

### 2. 필수 파일 확인
- [x] `package.json` 존재
- [x] `.gitignore` 존재
- [x] `.env.example` 존재 (실제 키 없음)
- [x] `README.md` 존재
- [x] 소스 코드 파일들 존재

## 📤 GitHub 업로드 방법

### 방법 1: 이 폴더에서 직접 업로드

```bash
# 이 폴더로 이동
cd /Users/ma25007/Desktop/Antigravity/aladin/aladin-tracker-for-github

# Git 초기화 (아직 안 했다면)
git init

# 모든 파일 추가
git add .

# 커밋
git commit -m "Initial commit: BookScope - 교육 참고서 추적 대시보드"

# GitHub 저장소 URL 추가 (YOUR_USERNAME과 YOUR_REPO_NAME 변경)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 푸시
git branch -M main
git push -u origin main
```

### 방법 2: 원본 폴더에서 업로드 (권장)

원본 폴더(`aladin-tracker`)에서 `.gitignore`가 자동으로 필터링하므로 더 안전합니다:

```bash
cd /Users/ma25007/Desktop/Antigravity/aladin/aladin-tracker

# 이미 스테이징된 파일 확인
git status

# 커밋
git commit -m "Initial commit: BookScope - 교육 참고서 추적 대시보드"

# GitHub 저장소 연결
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 푸시
git push -u origin main
```

## 🔒 보안 체크리스트

업로드 전에 반드시 확인:

- [ ] `.env.local` 파일이 없음
- [ ] 코드에 API 키가 하드코딩되어 있지 않음
- [ ] `.gitignore`에 `.env*` 패턴이 포함되어 있음
- [ ] `.env.example`만 있고 실제 키는 없음

## 📝 다음 단계

1. GitHub에 저장소 생성
2. 위의 명령어로 파일 업로드
3. Vercel/Netlify에서 배포
4. 배포 플랫폼에 환경 변수(`ALADIN_API_KEY`) 설정

## 🆘 문제 해결

### "API 키가 포함되어 있다"는 경고가 나오면
1. 해당 파일에서 API 키 제거
2. `.env.local` 사용하도록 수정
3. 다시 커밋

### ".env.local이 업로드되었다"면
1. 즉시 GitHub에서 삭제
2. `.gitignore` 확인
3. `git rm --cached .env.local` 실행
4. 다시 커밋 및 푸시

