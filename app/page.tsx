import type { Metadata } from "next";
import { logout } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "홈",
};

export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">홈</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        로그인에 성공하면 보이는 화면이에요. 사이드바가 생기기 전까지 쓰는 임시 화면이에요.
      </p>

      <form action={logout} className="mt-6">
        <Button type="submit" variant="outline">
          로그아웃
        </Button>
      </form>
    </main>
  );
}