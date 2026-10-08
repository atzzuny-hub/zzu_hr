"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login } from "@/lib/auth/actions";
import { initialState } from "@/lib/auth/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);
  const emailError = state.fieldErrors?.email?.[0];
  const passwordError = state.fieldErrors?.password?.[0];

  return (
    <div>
      <h1 className="text-2xl font-bold">로그인</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        초대받은 구성원도 여기서 로그인해요.
      </p>

      <form action={formAction} noValidate className="mt-10">
        <FieldGroup className="gap-6">
          <Field data-invalid={!!emailError || undefined}>
            <FieldLabel htmlFor="email">이메일</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="name@company.com"
              defaultValue={state.values?.email}
              aria-invalid={!!emailError || undefined}
              className="h-11"
            />
            <FieldError>{emailError}</FieldError>
          </Field>

          <Field data-invalid={!!passwordError || undefined}>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="password">비밀번호</FieldLabel>
              <Link
                href="/auth/forgot-password"
                className="text-sm font-medium text-primary hover:underline"
              >
                비밀번호를 잊으셨나요?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              aria-invalid={!!passwordError || undefined}
              className="h-11"
            />
            <FieldError>{passwordError}</FieldError>
          </Field>

          {state.message && (
            <p role="alert" className="text-sm text-destructive">
              {state.message}
            </p>
          )}

          <Button type="submit" disabled={pending} className="h-12 w-full text-base">
            {pending ? "로그인 중..." : "로그인"}
          </Button>
        </FieldGroup>
      </form>

      <p className="mt-10 text-sm text-muted-foreground">
        아직 계정이 없나요?{" "}
        <Link
          href="/auth/sign-up"
          className="font-medium text-primary underline underline-offset-4"
        >
          회사 계정 만들기
        </Link>
      </p>
    </div>
  );
}