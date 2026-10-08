"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { loginSchema } from "@/lib/validations/auth";
import type { FormState } from "@/lib/auth/types";

export async function login(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const raw = {
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  };

  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "error",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
      values: { email: raw.email },
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return {
      status: "error",
      message: loginErrorMessage(error.code),
      values: { email: raw.email },
    };
  }

  redirect("/");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

function loginErrorMessage(code: string | undefined) {
  switch (code) {
    case "invalid_credentials":
      return "이메일 또는 비밀번호가 맞지 않아요";
    case "email_not_confirmed":
      return "이메일 인증이 아직 끝나지 않았어요. 받은 메일의 링크를 눌러주세요";
    case "over_request_rate_limit":
      return "시도가 너무 많아요. 잠시 후 다시 시도해주세요";
    default:
      return "로그인에 실패했어요. 잠시 후 다시 시도해주세요";
  }
}