import type { Metadata } from "next";
import Link from "next/link";
import { cn } from "cn";
import { StepsAside } from "@/components/auth/auth-aside";
import { AuthSplitLayout } from "@/components/auth/auth-split-layout";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "메일 확인",
};

export default function CheckEmailPage() {
  return (
    <AuthSplitLayout aside={<StepsAside current={2} />}>
      <div>
        <h1 className="text-2xl font-bold">메일을 확인해주세요</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          입력한 주소로 인증 메일을 보냈어요. 메일의 링크를 누르면 가입이 완료돼요.
        </p>

        <p className="mt-6 text-sm text-muted-foreground">
          메일이 오지 않으면 스팸함을 확인해주세요. 이미 가입된 주소라면 메일이 오지
          않아요. 그 경우 로그인하거나 비밀번호 찾기를 이용해주세요.
        </p>

        <div className="mt-10 flex flex-col gap-3">
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "outline" }), "h-12 w-full text-base")}
          >
            로그인
          </Link>
          <Link
            href="/auth/forgot-password"
            className={cn(buttonVariants({ variant: "outline" }), "h-12 w-full text-base")}
          >
            비밀번호 찾기
          </Link>
        </div>
      </div>
    </AuthSplitLayout>
  );
}