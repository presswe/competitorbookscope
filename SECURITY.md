# 🔒 API 키 보안 가이드

## ⚠️ 중요: API 키는 절대 GitHub에 업로드하지 마세요!

현재 프로젝트는 `.gitignore` 파일에 `.env*` 패턴이 포함되어 있어 환경 변수 파일이 자동으로 제외됩니다.

## ✅ 현재 보안 설정

### 1. .gitignore 확인
- `.env*` 파일은 모두 제외됨 (`.env.example` 제외)
- `.env.local` 파일은 **절대 업로드되지 않음**

### 2. 안전한 파일들
- ✅ `.env.example`: API 키 없이 템플릿만 포함
- ✅ 모든 소스 코드: API 키를 하드코딩하지 않음

## 🛡️ 보안 체크리스트

### GitHub 업로드 전 확인사항

```bash
# 1. .env.local 파일이 제외되는지 확인
git status --ignored | grep .env

# 2. 커밋할 파일 목록 확인 (API 키가 포함된 파일이 없는지)
git status

# 3. 실제로 커밋될 파일 확인
git diff --cached --name-only
```

### 절대 업로드하면 안 되는 것들
- ❌ `.env.local`
- ❌ `.env`
- ❌ `.env.production`
- ❌ API 키가 하드코딩된 파일

## 🚀 배포 시 API 키 설정

### Vercel 배포
1. Vercel 대시보드 → Project Settings
2. Environment Variables 섹션
3. `ALADIN_API_KEY` 추가 (Value에 실제 API 키 입력)
4. Environment 선택:
   - Production
   - Preview
   - Development

### Netlify 배포
1. Site Settings → Environment Variables
2. `ALADIN_API_KEY` 추가
3. 각 환경별로 설정 가능

### Railway 배포
1. Project Settings → Variables
2. `ALADIN_API_KEY` 추가

## 🔍 API 키 유출 확인

만약 실수로 API 키를 업로드했다면:

1. **즉시 GitHub에서 삭제**
   - Settings → Secrets → Actions secrets 확인
   - 커밋 히스토리에서 API 키 제거 (git filter-branch 또는 BFG Repo-Cleaner 사용)

2. **API 키 재발급**
   - 알라딘 Open API에서 기존 키 비활성화
   - 새 API 키 발급

3. **저장소 보안 검사**
   ```bash
   # 저장소에서 API 키 검색
   git log -p | grep -i "ALADIN_API_KEY"
   ```

## 📝 베스트 프랙티스

1. ✅ 환경 변수는 항상 `.env.local`에 저장
2. ✅ `.env.example`에는 실제 키 대신 `your_api_key_here` 같은 플레이스홀더 사용
3. ✅ 코드에 API 키를 하드코딩하지 않기
4. ✅ 배포 플랫폼의 환경 변수 기능 사용
5. ✅ 저장소를 Public으로 공개할 경우 특히 주의

## 🧪 보안 테스트

업로드 전에 다음 명령어로 확인:

```bash
# API 키가 코드에 하드코딩되어 있는지 확인
grep -r "ttblms" . --exclude-dir=node_modules --exclude-dir=.git

# .env 파일이 커밋에 포함되는지 확인
git ls-files | grep "\.env"
```

결과가 비어있어야 안전합니다!

