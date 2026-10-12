'use client'

import Link from "next/link";
import { Button } from "../ui/button";
import { Field, FieldGroup, FieldLabel, FieldError, FieldDescription } from "../ui/field";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";


export function SignUpForm(){

    return(
        <div>
            <h1 className="text-2xl font-bold">
                회사 계정 만들기
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
                대표나 인사 담당자가 먼저 가입하고, 구성원은 가입 후에 초대해요.
            </p>

            <form className="mt-10">
                <FieldGroup className="gap-6">
                    <Field>
                        <FieldLabel htmlFor="name">이름</FieldLabel>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            className="h-11"
                        />
                        <FieldError/>
                    </Field>
                
                    <Field>
                        <FieldLabel htmlFor="email">업무용 이메일</FieldLabel>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="name@company.com"
                            className="h-11"
                        />
                        <FieldError/>
                    </Field>
                
                    <Field>
                        <FieldLabel htmlFor="password">비밀번호</FieldLabel>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            className="h-11"
                        />
                        <FieldDescription>8자 이상</FieldDescription>
                        <FieldError/>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="passwordConfirm">비밀번호 확인</FieldLabel>
                        <Input
                            id="passwordConfirm"
                            name="passwordConfirm"
                            type="password"
                            className="h-11"
                        />
                        <FieldError/>
                    </Field>

                    <Button type="submit" className="h-12 w-full text-base">
                        가입하기
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