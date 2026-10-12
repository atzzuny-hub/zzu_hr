'use client'

import { useActionState } from "react";
import { signUp } from "@/lib/auth/actions";
import { initialState } from "@/lib/auth/types";
import Link from "next/link";
import { Button } from "../ui/button";
import { Field, FieldGroup, FieldLabel, FieldError, FieldDescription } from "../ui/field";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";


export function SignUpForm(){

    const [state, formAction, pending] = useActionState(signUp, initialState);
    console.log('111',state, formAction, pending);
    
    const nameError = state.fieldErrors?.name?.[0];
    const emailError = state.fieldErrors?.email?.[0];
    const passwordError = state.fieldErrors?.password?.[0];
    const passwordConfirmError = state.fieldErrors?.passwordConfirm?.[0];

    return(
        <div>
            <h1 className="text-2xl font-bold">
                회사 계정 만들기
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
                대표나 인사 담당자가 먼저 가입하고, 구성원은 가입 후에 초대해요.
            </p>

            <form action={formAction} noValidate className="mt-10">
                <FieldGroup className="gap-6">
                    <Field data-invalid={!!nameError || undefined}>
                        <FieldLabel htmlFor="name">이름</FieldLabel>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            className="h-11"

                            autoComplete="name"
                            defaultValue={state.values?.name}
                            aria-invalid={!!nameError || undefined}
                        />
                        <FieldError>{nameError}</FieldError>
                    </Field>
                
                    <Field data-invalid={!!emailError || undefined}>
                        <FieldLabel htmlFor="email">업무용 이메일</FieldLabel>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="name@company.com"
                            className="h-11"

                            autoComplete="email"
                            defaultValue={state.values?.email}
                            aria-invalid={!!emailError || undefined}
                        />
                        <FieldError>{emailError}</FieldError>
                    </Field>
                
                    <Field data-invalid={!!passwordError || undefined}>
                        <FieldLabel htmlFor="password">비밀번호</FieldLabel>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            className="h-11"

                            autoComplete="new-password"
                            aria-describedby="password-hint"
                            aria-invalid={!!passwordError || undefined}
                        />
                        <FieldDescription id="password-hint">8자 이상</FieldDescription>
                        <FieldError>{passwordError}</FieldError>
                    </Field>

                    <Field data-invalid={!!passwordConfirmError || undefined}>
                        <FieldLabel htmlFor="passwordConfirm">비밀번호 확인</FieldLabel>
                        <Input
                            id="passwordConfirm"
                            name="passwordConfirm"
                            type="password"
                            className="h-11"

                            autoComplete="new-password"
                            aria-invalid={!!passwordConfirmError || undefined}
                        />
                        <FieldError>{passwordConfirmError}</FieldError>
                    </Field>

                    {state.message && (
                        <p role="alert" className="text-sm text-destructive">
                            {state.message}
                        </p>
                    )}

                    <Button type="submit" disabled={pending} className="h-12 w-full text-base">
                        {pending ? "가입 중..." : "가입하기"}
                    </Button>
                </FieldGroup>
            </form> 

            <p className="mt-10 text-sm text-muted-foreground">
                이미 계정이 있나요? {" "}
                <Link
                    href='/login'
                    className="font-medium text-primary underline underline-offset-4"
                >
                    로그인
                </Link>
            </p>     

            <Separator className="my-6"/>

            <p className="text-sm text-muted-foreground">
                회사에서 초대를 받았다면 가입하지 말고 초대 메일의 링크로 들어오세요.
            </p>     
        </div>
    )
}