import z from "zod";

export const signInSchema = z.object({
  email: z.email({ message: "Please provide valid email" }),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 charachers long" }),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;
