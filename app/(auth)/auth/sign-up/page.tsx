import type { Metadata } from "next";
import { AuthSplitLayout } from "@/components/auth/auth-split-layout";
import { StepsAside } from "@/components/auth/auth-aside";
import { SignUpForm } from "@/components/auth/sign-up-form";

export const metadata: Metadata = {
  title: "회사 계정 만들기",
};

export default function SignUpPage() {
  return (
    <AuthSplitLayout aside={<StepsAside current={1}/>}>
      <SignUpForm/>
    </AuthSplitLayout>
  );
}