# flex 인증 작업 인수인계 메모

2026년 10월 12일 · @앗쭈 (2026-10-08 메모를 05-1, 05-2 작업까지 반영해 갱신)

다른 컴퓨터에서 이어서 작업하기 위한 요약이다. 클로드에게 이 파일을 통째로 붙여넣으면 같은 방식으로 4단계(비밀번호 찾기·재설정)부터 안내받을 수 있다.

## 먼저 할 일

1. `git pull` 뒤 `npm install`. zod가 의존성에 들어 있다.
2. `.env.local`은 gitignore 대상이라 직접 옮긴다. 키는 두 개다.
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
3. Node는 22 이상. 지금은 nvm default 24.21.0을 쓴다. `.nvmrc`는 없다(만들려면 내용 `24` 한 줄).
4. 클로드가 쓰는 비대화형 셸은 nvm 경로를 낮은 버전(16)부터 잡는 문제가 있었다. 클로드가 npm을 돌릴 때는 먼저 `export PATH="$HOME/.nvm/versions/node/v24.21.0/bin:$PATH"`를 붙이면 된다.
5. gh CLI는 선택이다. 이 Mac에는 brew도 gh도 없어서 클로드 셸에서는 푸시가 안 되고, 커밋까지만 클로드가 하고 푸시는 터미널에서 직접 `git push origin main` 한다. 클로드가 바로 푸시하게 하려면 brew를 깐 뒤 아래를 실행한다.

```bash
brew install gh && gh auth login && gh auth setup-git
```

## 프로젝트

- zzu_hr. HR 서비스 flex. 저장소 https://github.com/atzzuny-hub/zzu_hr
- Next.js 16.4 (cacheComponents 켜짐), React 19.3, Supabase SSR (@supabase/ssr 0.12.7, supabase-js 2.117.2), shadcn base-nova (Base UI 1.8 기반), Tailwind v4, zod 4.6.5
- Supabase는 호스팅 프로젝트만 쓴다. CLI와 Docker는 쓰지 않는다. 스키마 변경은 대시보드 SQL Editor에서 하고, 저장된 쿼리가 마이그레이션 기록 역할을 한다.
- AGENTS.md 규칙: 코드 쓰기 전에 node_modules/next/dist/docs 의 관련 문서를 읽는다. Next.js 16은 학습 데이터와 다른 부분이 많다.
- 마지막 커밋: 1cf218c "05-2 회원가입 로직 연결" (main, 푸시 완료). 그 앞은 86d6519 "05-1 회원가입 화면 그리기", 065f983 "인증 1·2단계: 공통 바탕과 로그인 화면 추가".

## 작업 방식

- 사용자가 코드를 직접 친다. 클로드는 한 단계씩 파일 경로, 코드, 이유를 알려주고 "확인했어"를 기다린다. 프로젝트 파일은 편집하지 않는다. 커밋은 사용자가 요청하면 클로드가 한다(메시지는 글 번호 + 제목, 예: "05-2 회원가입 로직 연결").
- 05부터는 "화면 먼저"로 간다. 페이지 뼈대(자리표시자) → 왼쪽 패널 → 폼 UI(액션 없이) → 스키마 → 서버 액션 → 폼에 useActionState 연결 → 나머지 페이지 → 라우트 → 테스트. 단계마다 브라우저에서 확인하고 캡처를 남긴다.
- 단계가 끝나면 "클로드코드와 flex 만들기 NN" 시리즈 포스팅용으로 평서문(~다) 메모를 써준다. 구성은 제목, 날짜·@앗쭈, 소개, 만든 파일, 단계별 코드, 이렇게 한 이유, 막혔던 것, 다음. 썸네일은 docs/thumbnail 참고.
- 포스팅 현황: 01 프로젝트 셋업, 02 로그인·회원가입 설계 메모(0단계), 1단계 대시보드 설정 글, 04 로그인 화면(1·2단계), 05-1 회원가입 화면 그리기, 05-2 회원가입 로직 연결(초안 완성, 테스트 캡처만 남음).

## 설계 메모의 5단계

1. 공통 바탕 (완료)
2. 로그인 + 임시 로그아웃 (완료)
3. 회원가입 → check-email → confirm → error (완료, 05-1·05-2)
4. 비밀번호 찾기 → 재설정
5. proxy 규칙 (로그인 사용자를 /login, /auth/sign-up에서 /로)

## Supabase 대시보드 상태 (1단계 완료)

- Sign In / Providers → Email: Confirm email 켜짐, Minimum password length 8, 나머지 기본값.
- URL Configuration: Site URL `http://localhost:3000`, Redirect URLs `http://localhost:3000/**`.
- 커스텀 SMTP는 Brevo. 기본 메일 서비스로는 템플릿 소스 편집이 막혀 있어서 연결했다. 발신자 wonjoo88@reve-on.com 인증됨(발신인 이름 flex), Host smtp-relay.brevo.com, 포트 587, 사용자 이름은 Brevo SMTP 탭의 Login 값(`xxxxxxx@smtp-brevo.com` 형식), 비밀번호는 SMTP 키. 발송 한도 시간당 30통.
- Brevo 도메인 인증(DKIM·DMARC)은 미완. reve-on.com은 가비아에서 샀지만 네임서버가 AWS Route 53(hostcocoa 브랜드)이라 인프라 담당자가 호스팅 존에 레코드를 넣어야 한다. SPF는 기존 Google 것 하나에 `include:spf.brevo.com`을 합치고, DMARC는 없으니 Brevo가 제안하는 `p=none` 레코드를 추가한다. 안 해도 발송은 되고 경고만 뜬다.
- 템플릿 두 개 교체됨. Confirm signup → `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next=/`, Reset password → `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/auth/reset-password`.
- SQL 적용됨: public.profiles(id, email, full_name, created_at, updated_at), RLS(본인 행 select·update), 컬럼 grant(full_name, updated_at만 수정 가능), 트리거 on_auth_user_created(handle_new_user: raw_user_meta_data->>'full_name' 복사), on_auth_user_email_updated(이메일 동기화). insert 정책은 의도적으로 없다.
- 테스트 계정: 05-2 테스트로 가입한 계정이 Users에 남아 있을 수 있다. 가입을 다시 테스트하려면 다른 주소를 쓰거나 Users에서 지운다.

## 지금까지 만든 파일

| 파일 | 역할 |
|---|---|
| app/globals.css | 토큰: --background #F7F6FA, --foreground #1C1730, --primary·--ring #5B3FD6, --primary-foreground #fff, --muted-foreground #5E5873, --input #8F89A3, --brand #231942 (+ @theme inline --color-brand, --color-brand-foreground), body word-break: keep-all |
| app/layout.tsx | IBM Plex Sans KR (variable --font-sans), Geist_Mono 유지, metadata title { default: "[서비스명]", template: "%s \| [서비스명]" }. Geist import가 미사용으로 남아 lint 경고 1개 |
| app/page.tsx | 임시 홈. 제목과 logout 폼만 있음. 쿠키 안 읽음 (정적) |
| app/(auth)/login/page.tsx | AuthSplitLayout + BrandAside + LoginForm, title "로그인" |
| app/(auth)/auth/sign-up/page.tsx | AuthSplitLayout + StepsAside current={1} + SignUpForm, title "회사 계정 만들기" |
| app/(auth)/auth/check-email/page.tsx | StepsAside current={2}. 중립 문구(이메일 주소 안 보여줌), Link + buttonVariants 버튼 2개(/login, /auth/forgot-password) |
| app/(auth)/auth/error/page.tsx | BrandAside. "링크를 사용할 수 없어요", 버튼 2개(/login, /auth/sign-up). 쿼리 안 읽음 |
| app/(auth)/auth/confirm/route.ts | GET. token_hash·type(EmailOtpType)·next 읽어 verifyOtp → NextResponse.redirect(next). 실패 시 /auth/error. safeNextUrl이 next를 origin 비교로 검사. try/catch 없음, 세그먼트 설정 없음 |
| components/auth/brand-logo.tsx | lucide Network 아이콘 + "zzuny_flex"(임시 서비스명). 글자색은 부모 상속 |
| components/auth/auth-split-layout.tsx | 서버 컴포넌트. props aside, children. lg 이상 aside 36% 플럼 패널(p-12, xl:p-14), lg 미만 aside 숨기고 header에 BrandLogo. main은 bg-card, 안쪽 max-w-[400px] |
| components/auth/auth-aside.tsx | BrandAside(BrandLogo, SVG 조직도 OrgChartGraphic·Node, 문구 "구성원, 근무, 휴가를 / 한곳에서 관리해요.") + StepsAside({ current: 1 \| 2 \| 3 \| 4 }). STEPS 4개 as const, 번호 원 + w-px flex-1 세로선, 현재 단계 bg-primary text-primary-foreground |
| components/auth/login-form.tsx | 'use client'. useActionState(login, initialState). Field/FieldLabel/FieldError/FieldGroup, Input h-11, Button type="submit" h-12. 링크 /auth/forgot-password(아직 404), /auth/sign-up |
| components/auth/sign-up-form.tsx | 'use client'. useActionState(signUp, initialState). Field 4개(name, email, password, passwordConfirm), FieldDescription "8자 이상"(id password-hint), message alert, pending. import는 ../ui 상대경로(로그인 폼은 @/ 별칭, 둘 다 동작) |
| lib/auth/types.ts | FormState { status: "idle"\|"error"\|"success"; message?; fieldErrors?: Record<string, string[]\|undefined>; values?: { name?, email? } }, initialState |
| lib/auth/actions.ts | 'use server'. login, logout, signUp. signUp: safeParse → signUp({ email, password, options: { data: { full_name: name } } }) → error.code !== "user_already_exists"면 message 반환 → data.session 있으면 "/" → 아니면 "/auth/check-email". loginErrorMessage, signUpErrorMessage는 export 안 함 |
| lib/validations/auth.ts | emailField(trim → min(1) → pipe(z.email())), passwordField(min 8), nameField(trim, min 1), loginSchema, signUpSchema(name: nameField.max(50), passwordConfirm min(1), refine 일치 검사 path ["passwordConfirm"]), SignUpInput |
| lib/supabase/client.ts, server.ts, proxy.ts, proxy.ts(루트) | 셋업 때 만든 것. server.ts의 setAll에 _headers 인자가 남아 lint 경고 1개 |

## 코드만 봐서는 모르는 결정

- (auth)/layout.tsx는 만들지 않는다. metadata 템플릿은 루트 레이아웃에 둔다.
- 모바일은 패널을 숨긴다. 쌓고 싶으면 aside의 hidden 제거, header 삭제.
- fieldErrors 키를 느슨한 Record로 둔 건 네 폼이 한 타입을 쓰기 위해서다. 불편하면 제네릭으로 조인다.
- 로그인 뒤 revalidatePath는 뺐다. Next 16은 쿠키 변경 시 현재 페이지를 재렌더하고 redirect가 목적지를 새로 받는다. 캐시 태그를 쓰게 되면 updateTag 추가.
- Base UI Button은 type 기본값이 "button"이다. 폼 버튼마다 type="submit"을 꼭 적는다.
- 서버 액션에서 formData.get은 String(... ?? "")로 감싼다. null이면 zod가 영어 오류를 낸다.
- zod 4 문법: 오류 문구는 { error }. z.email().trim()은 검사가 trim보다 먼저 돌아서 쓰지 않는다. z.string().email()은 deprecated. 필드 오류는 z.flattenError(err).fieldErrors.
- 이 프로젝트의 cn은 shadcn이 만든 "cn" 패키지(clsx + tailwind-merge)라 className으로 준 높이가 기본값을 대체한다. components/ui 관례대로 `import { cn } from "cn"`.
- StepsAside의 current 타입은 1 | 2 | 3 | 4다. 지금 쓰는 화면은 1, 2뿐이지만 타입은 컴포넌트가 지원하는 범위를 말한다. STEPS를 바꾸면 유니온도 같이 고친다.
- FieldError는 자식이 있으면 무조건 그린다. 화면만 그리는 단계에서는 비워 두고, 로직 연결 때 {xError}를 넣는다.
- 폼은 하나, 그 안에 FieldGroup 하나, 그 안에 Field 여러 개. 입력칸마다 form을 복사하면 제출 시 한 칸만 전송되는 조용한 버그가 생긴다.
- 링크 모양 버튼은 Button의 render prop에 Link를 끼우지 않는다. Base UI가 앵커에 role="button"을 강제한다. Link + buttonVariants()로 만든다.
- 중복 이메일: Supabase는 Confirm email과 Confirm phone이 둘 다 켜져 있으면 가짜 성공(identities 빈 user), 아니면 user_already_exists 오류를 돌려준다. 둘 다 /auth/check-email로 보내 가입 여부를 숨긴다. check-email 문구가 그 경우를 안내한다.
- signUp에 emailRedirectTo는 넣지 않는다. 템플릿이 next를 고정한다.
- confirm 라우트: 전체 try/catch 금지(Cache Components의 프리렌더 중단 예외를 삼킴), export const dynamic 금지, next는 `new URL(value, origin)`으로 만들어 origin이 같을 때만 허용(`//`만 막으면 `/\evil.com` 우회됨).
- check-email, error 페이지는 searchParams를 읽지 않는다(읽으면 Suspense 필요).
- /auth/forgot-password 링크는 4단계 전까지 404다.
- Cache Components 규칙 요약: 페이지·레이아웃은 렌더 중 cookies()/searchParams 읽지 않기, 쿠키 쓰기와 redirect는 서버 액션·라우트 핸들러에서, 사용자를 읽는 화면은 Suspense 안 async 컴포넌트에서, force-dynamic 금지(탈출구는 `export const instant = false`).
- 테스트 계정은 Supabase 대시보드 Authentication → Users → Add user, Auto Confirm User 켜서 만들 수 있다.
- 서비스 이름은 미정. 정해지면 brand-logo.tsx와 layout.tsx metadata 두 곳만 바꾼다.
- lint 경고 2개(layout.tsx Geist 미사용 import, server.ts _headers)는 지워도 된다.
- 05-2 6번 테스트(메일 링크 → 홈, Users confirmed, profiles 행, 로그아웃 후 로그인, 같은 링크 재클릭 → /auth/error) 결과는 이 메모 시점에 기록되지 않았다. 이어서 할 때 먼저 돌려본다.

## 다음에 할 것

### 4단계 비밀번호 찾기 → 재설정 (포스팅 06)

- lib/validations/auth.ts: forgotPasswordSchema({ email: emailField }), resetPasswordSchema({ password: passwordField, passwordConfirm } + refine 일치 검사)
- lib/auth/actions.ts: forgotPassword(prev, formData) → safeParse → supabase.auth.resetPasswordForEmail(email) → 오류여도 계정 존재 여부를 숨기고 redirect("/auth/check-email"). redirectTo는 불필요(Reset password 템플릿이 next=/auth/reset-password 고정). resetPassword(prev, formData) → safeParse → supabase.auth.updateUser({ password }) → 오류면 message(세션 없음은 "링크가 만료됐어요. 다시 요청해주세요" 류) → redirect("/")
- components/auth/forgot-password-form.tsx, reset-password-form.tsx (login-form 구조, 비밀번호 칸 autoComplete new-password)
- app/(auth)/auth/forgot-password/page.tsx, app/(auth)/auth/reset-password/page.tsx (둘 다 BrandAside). 재설정 페이지에서 세션 확인이 필요하면 Suspense 안 async 컴포넌트에서 getClaims하고 없으면 redirect("/auth/forgot-password"). 페이지 상단에서 cookies()를 읽으면 빌드 오류.
- 메일 확인 페이지와 confirm 라우트는 05-2 것을 그대로 쓴다. 재설정 링크는 type=recovery로 들어온다.
- 테스트: forgot → 메일 → 링크(/auth/confirm?type=recovery) → /auth/reset-password → 새 비밀번호 → / → 로그아웃 → 새 비밀번호로 로그인

### 5단계 proxy 규칙 (포스팅 07, 짧으면 06에 합침)

- lib/supabase/proxy.ts에 로그인된 사용자가 /login, /auth/sign-up에 오면 /로 보내는 규칙 추가. /auth/confirm, /auth/reset-password, /auth/error, /auth/check-email은 예외. 흐름이 다 돌아간 뒤 맨 마지막에 넣는다.

### 마무리

- app/page.tsx: 사용자 이름(profiles.full_name)을 Suspense 안 async 컴포넌트에서 읽어 표시. 임시 로그아웃을 사이드바로 옮긴다. 이 프로젝트에서 처음으로 쿠키를 읽는 화면이라 Cache Components 패턴을 보여주는 글이 된다.

### 그 뒤 (회사 기능)

- 시안의 StepsAside 3단계 "회사 정보 등록", 4단계 "승인 후 구성원 초대". companies, memberships, invitations 테이블 설계 글(0단계 형식)이 먼저. 구성원 초대의 inviteUserByEmail은 Secret key가 필요해 서버 전용으로 설계한다. Confirm signup 템플릿의 next=/를 /onboarding/company 같은 값으로 바꾸는 것도 이때.

## 썸네일 만드는 법

docs/thumbnail/thumbnail-template.html(05-2 버전)과 render.mjs가 있다. 1200×630, 다크 네이비 바탕, 그린 배지 번호, 노란 부제, 모노스페이스 칩(next 16.4 식), 오른쪽 코드 카드, 하단 "FLEX · BUILT WITH CLAUDE CODE". 새 편은 HTML의 배지 번호, 제목, 부제, 칩, 코드 카드 내용만 바꾼다.

렌더링은 저장소 밖 임시 폴더에서 한다(프로젝트 package.json을 더럽히지 않기 위해). macOS에 Chrome이 설치되어 있어야 한다.

```bash
mkdir -p /tmp/flex-thumb && cp docs/thumbnail/* /tmp/flex-thumb && cd /tmp/flex-thumb && npm init -y >/dev/null && npm i puppeteer-core && node render.mjs thumbnail-template.html thumbnail-06-1200x630
```

결과는 thumbnail-06-1200x630.png(1배)와 @2x.png(2배)다. 태그는 검색용(Next.js, Next.js 16, App Router, Supabase, Supabase Auth, Server Actions, zod, TypeScript) + 글 고유 + 시리즈용(Claude Code, 클로드코드, flex, 사이드프로젝트) 세 묶음으로 쓴다.
