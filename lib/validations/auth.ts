import {z} from 'zod'

export const emailField = z
    .string()
    .trim()
    .min(1, {error: "이메일을 입력해주세요"})
    .pipe(z.email({ error : "올바른 이메일 형식이 아니에요"}))

export const passwordField = z
    .string()
    .min(8, {error: "비밀번호는 8자 이상이어야 해요"})

export const nameField = z
    .string()
    .trim()
    .min(1, {error: "이름을 입력해주세요"})

export const loginSchema = z.object({
    email: emailField,
    password: z.string().min(1, {error: "비밀번호를 입력해주세요."})
})

export type loginInput = z.infer<typeof loginSchema>

export const signUpSchema = z
    .object({
        name: nameField.max(50, {error: "이름은 50자 이하로 입력해주세요"}),
        email: emailField,
        password: passwordField,
        passwordConfirm: z.string().min(1, {error: "비밀번호를 한 번 더 입력해주세요."})
    })
    .refine((data) => data.password === data.passwordConfirm, {
        error: "비밀번호가 서로 달라요",
        path:["passwordConfirm"],
    })

export type SignUpInput = z.infer<typeof signUpSchema>