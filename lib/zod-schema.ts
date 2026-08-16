import z from "zod";
import { studySteps, type StudyStepField } from "@/constants/study-steps";

const MIN_PASSWORD_LENGTH = 8;

export const signInSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(MIN_PASSWORD_LENGTH, {
    message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
  }),
});

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long" }),
    email: z.email("Invalid email address"),
    image: z.string().nullable(),
    password: z.string().min(MIN_PASSWORD_LENGTH, {
      message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
    }),
    password_confirm: z.string("Please confirm password"),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "Passwords don't match",
    path: ["password_confirm"],
  });

export const confirmUserSchema = z.object({
  userId: z.string().min(1, { message: "Please provide proper user" }),
  clinic: z.string().min(1, "Please select a clinic"),
  department: z.string().min(1, "Please select a department"),
  study: z
    .string("Please provide valid study")
    .min(3, { message: "Study must be at least 3 characters long" }),
});

const studyStepFields = studySteps.map((step) => step.field) as [
  StudyStepField,
  ...StudyStepField[],
];

export const studyDetailSchema = z.object({
  name: z.enum(studyStepFields, { message: "Unknown study step" }),
  date: z.date({ message: "Please select a proper date" }),
  description: z.string().optional(),
  doctorInfoId: z.string().min(1, { message: "Please provide a valid study" }),
  checked: z.boolean(),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;
export type SignUpSchemaType = z.infer<typeof signUpSchema>;
export type ConfirmUserSchemaType = z.infer<typeof confirmUserSchema>;
export type StudyDetailSchemaType = z.infer<typeof studyDetailSchema>;
