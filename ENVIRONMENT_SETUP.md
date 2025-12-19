# 🔑 환경 변수 설정 가이드

## 현재 상태

### 로컬 개발 환경
- ✅ `.env.local` 파일에 API 키가 있음
- ✅ 로컬에서는 실제 알라딘 API 사용 중

### GitHub 업로드 후
- ⚠️ `.env.local`은 업로드되지 않음 (보안상 올바름)
- ⚠️ 배포 시 환경 변수를 설정해야 실제 API 사용 가능
- ✅ 환경 변수 없어도 Mock 데이터로 작동함

## 작동 방식

코드는 다음과 같이 작동합니다:

```typescript
const apiKey = process.env.ALADIN_API_KEY;
if (!apiKey) {
    // API 키가 없으면 Mock 데이터 사용
    console.warn("ALADIN_API_KEY is not set. Using MOCK data.");
    return MOCK_BOOKS;
}
// API 키가 있으면 실제 알라딘 API 사용
```

### 시나리오별 작동 상태

| 환경 | API 키 | 작동 여부 | 데이터 |
|------|--------|----------|--------|
| 로컬 개발 | ✅ 있음 (`.env.local`) | ✅ 작동 | 실제 API 데이터 |
| GitHub 업로드 | ❌ 없음 | ✅ 작동 | Mock 데이터 |
| 배포 (환경 변수 없음) | ❌ 없음 | ✅ 작동 | Mock 데이터 |
| 배포 (환경 변수 설정) | ✅ 있음 | ✅ 작동 | 실제 API 데이터 |

## 배포 시 환경 변수 설정

### Vercel 배포 시

1. **프로젝트 배포 후**
   - Vercel 대시보드 → 프로젝트 선택
   - Settings → Environment Variables

2. **환경 변수 추가**
   ```
   Name: ALADIN_API_KEY
   Value: ttblms96671710001 (실제 API 키)
   Environment: Production, Preview, Development (모두 선택)
   ```

3. **재배포**
   - 환경 변수 추가 후 자동 재배포 또는 수동 재배포
   - Deployments → 최신 배포 → Redeploy

### Netlify 배포 시

1. **Site Settings → Environment Variables**
2. **Add a variable**
   ```
   Key: ALADIN_API_KEY
   Value: ttblms96671710001
   ```
3. **Redeploy site**

### Railway 배포 시

1. **Project → Variables**
2. **New Variable**
   ```
   Key: ALADIN_API_KEY
   Value: ttblms96671710001
   ```
3. 자동으로 재배포됨

## 확인 방법

### 배포 후 API 작동 확인

1. **브라우저 콘솔 확인**
   - 개발자 도구 (F12) → Console
   - "ALADIN_API_KEY is not set. Using MOCK data." 메시지 확인
   - 이 메시지가 없으면 실제 API 사용 중

2. **데이터 확인**
   - Mock 데이터: 고정된 12개 책만 표시
   - 실제 API: 최신 도서 목록이 표시됨

3. **네트워크 탭 확인**
   - 개발자 도구 → Network
   - `aladin.co.kr`로 요청이 가는지 확인
   - 요청이 없으면 Mock 데이터 사용 중

## 문제 해결

### "API 키가 설정되지 않았다"는 경고가 나오면

1. **환경 변수 이름 확인**
   - 정확히 `ALADIN_API_KEY`인지 확인 (대소문자 구분)

2. **재배포 확인**
   - 환경 변수 추가 후 재배포 필요

3. **환경 선택 확인**
   - Production, Preview, Development 모두 설정했는지 확인

### Mock 데이터로 작동 중인지 확인

- 브라우저 콘솔에 경고 메시지가 있으면 Mock 데이터 사용 중
- 실제 API를 사용하려면 위의 방법으로 환경 변수 설정

## 요약

✅ **GitHub에 올려도 작동합니다!**
- 환경 변수 없으면 Mock 데이터로 작동
- 환경 변수 설정하면 실제 API로 작동
- 배포 플랫폼에서 환경 변수만 설정하면 됨

