export type FormState = {
    status: "idle" | "error" | "success";
    message?: string;
    fieldErrors?: Record<string, string[] | undefined>;
    values?:{
        name?: string;
        email?: string;
    }
}

export const initialState: FormState = {status : "idle"}