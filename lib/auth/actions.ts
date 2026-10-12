"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { loginSchema, signUpSchema } from "@/lib/validations/auth";
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

export async function signUp(
  _prevState : FormState,
  formData : FormData
):Promise<FormState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
    passwordConfirm: String(formData.get("passwordConfirm") ?? "")
  }

  const parsed = signUpSchema.safeParse(raw);

  if(!parsed.success){
    return{
      status: "error",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
      values:{name: raw.name, email:raw.email}
    }
  }

  const {name, email, password} = parsed.data;

  const supabase = await createClient();

  const {data, error} = await supabase.auth.signUp({
    email,
    password,
    options:{
      data:{full_name: name}
    }
  })

  if(error && error.code !== 'user_already_exists'){
    return {
      status: "error",
      message: signUpErrorMessage(error.code),
      values: {name: raw.name, email: raw.email}
    };
  }

  if(data.session){
    redirect('/')
  }

  redirect("/auth/check-email")
}

function signUpErrorMessage(code: string | undefined){
  switch(code) {
    case "weak_password":
      return "비밀번호가 너무 약해요. 더 복잡한 비밀번호를 사용해주세요.";
    case "over_email_send_rate_limit":
      return "인증 메일을 너무 자주 보냈어요. 잠시 후 다시 시도해주세요";
    case "email_address_invalid":
      return "사용할 수 없는 이메일 주소에요. 다른 주소를 입력해주세요.";
    default:
      return "가입에 실패했어요. 잠시 후 다시 시도해주세요.";
  }
}