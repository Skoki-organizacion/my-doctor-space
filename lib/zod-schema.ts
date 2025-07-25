import z from "zod";

export const signInSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 charachers long" }),
});

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 charachers long" }),
    email: z.email("Invalid email address"),
    image: z.string().nullable(),
    password: z
      .string()
      .min(3, { message: "Password must be at least 3 charachers long" }),
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
    .min(3, { message: "Study must be at least 3 charachers long" }),
});

export const studyDetailSchema = z.object({
  erhalt: z.date().optional(),
  erhaltComment: z.string().optional(),
  meldung: z.date().optional(),
  meldungComment: z.string().optional(),
  vorprufung: z.date().optional(),
  vorprufungComment: z.string().optional(),
  kenntnisnahme: z.date().optional(),
  kenntnisnahmeComment: z.string().optional(),
  detailprufung: z.date().optional(),
  detailprufungComment: z.string().optional(),
  freigabe: z.date().optional(),
  freigabeComment: z.string().optional(),
  bewertung: z.date().optional(),
  bewertungComment: z.string().optional(),
  genehmigung: z.date().optional(),
  genehmigungComment: z.string().optional(),
  verhandlung: z.date().optional(),
  verhandlungComment: z.string().optional(),
  festlegung: z.date().optional(),
  festlegungComment: z.string().optional(),
  abschluss: z.date().optional(),
  abschlussComment: z.string().optional(),
  vorbereitung: z.date().optional(),
  vorbereitungComment: z.string().optional(),
  studien: z.date().optional(),
  studienComment: z.string().optional(),
  durchfuhrung: z.date().optional(),
  durchfuhrungComment: z.string().optional(),
  patienten_one: z.number().optional(),
  patienten_oneComment: z.string().optional(),
  stand_one: z.number().optional(),
  stand_oneComment: z.string().optional(),
  patienten_two: z.number().optional(),
  patienten_twoComment: z.string().optional(),
  stand_two: z.number().optional(),
  stand_twoComment: z.string().optional(),
  patienten_three: z.number().optional(),
  patienten_threeComment: z.string().optional(),
  stand_three: z.number().optional(),
  stand_threeComment: z.string().optional(),
  ubernahme: z.date().optional(),
  ubernahmeComment: z.string().optional(),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;
export type SignUpSchemaType = z.infer<typeof signUpSchema>;
export type ConfirmUserSchemaType = z.infer<typeof confirmUserSchema>;
export type StudyDetailSchema = z.infer<typeof studyDetailSchema>;
