import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = safeNextUrl(searchParams.get("next"), origin);

  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });

    if (!error) {
      return NextResponse.redirect(next);
    }
  }

  return NextResponse.redirect(new URL("/auth/error", origin));
}

function safeNextUrl(value: string | null, origin: string) {
  const fallback = new URL("/", origin);
  if (!value || !value.startsWith("/")) {
    return fallback;
  }
  const url = new URL(value, origin);
  return url.origin === origin ? url : fallback;
}