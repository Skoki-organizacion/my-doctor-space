import z from "zod";

export const signInSchema = z.object({
  email: z.email({ message: "Please provide valid email" }),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 charachers long" }),
});

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 charachers long" }),
    email: z.email({ message: "Please provide valid email" }),
    password: z.string(),
    password_confirm: z.string(),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export type SignInSchemaType = z.infer<typeof signInSchema>;
export type SignUpSchemaType = z.infer<typeof signUpSchema>;
