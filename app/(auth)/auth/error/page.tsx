import type { Metadata } from "next";
import Link from "next/link";
import { cn } from "cn";
import { BrandAside } from "@/components/auth/auth-aside";
import { AuthSplitLayout } from "@/components/auth/auth-split-layout";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "링크 오류",
};

export default function AuthErrorPage() {
  return (
    <AuthSplitLayout aside={<BrandAside />}>
      <div>
        <h1 className="text-2xl font-bold">링크를 사용할 수 없어요</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          링크가 만료됐거나 이미 사용됐어요. 다시 시도해주세요.
        </p>

        <div className="mt-10 flex flex-col gap-3">
          <Link
            href="/login"
            className={cn(buttonVariants(), "h-12 w-full text-base")}
          >
            로그인
          </Link>
          <Link
            href="/auth/sign-up"
            className={cn(buttonVariants({ variant: "outline" }), "h-12 w-full text-base")}
          >
            회사 계정 만들기
          </Link>
        </div>
      </div>
    </AuthSplitLayout>
  );
}