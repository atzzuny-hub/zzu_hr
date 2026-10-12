import { BrandAside } from "@/components/auth/auth-aside";
import { AuthSplitLayout } from "@/components/auth/auth-split-layout";
import { LoginForm } from "@/components/auth/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인",
};


export default function LoginPage() {
  return (
    <AuthSplitLayout aside={<BrandAside/>}>
        <LoginForm/>
    </AuthSplitLayout>
  );
}