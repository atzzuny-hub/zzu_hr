import type { ReactNode } from "react";
import { BrandLogo } from "./brand-logo";

type AuthSplitLayoutProps = {
  aside: ReactNode;
  children: ReactNode;
};

export function AuthSplitLayout({ aside, children }: AuthSplitLayoutProps) {
  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      <aside className="hidden lg:flex lg:w-[36%] lg:shrink-0 lg:flex-col bg-brand p-12 text-brand-foreground xl:p-14">
        {aside}
      </aside>

      <header className="px-6 py-5 lg:hidden">
        <BrandLogo />
      </header>

      <main className="flex flex-1 items-center justify-center bg-card px-6 py-12">
        <div className="w-full max-w-[400px]">{children}</div>
      </main>
    </div>
  );
}