"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signUpSchema, SignUpSchemaType } from "@/lib/zod-schema";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { authClient } from "@/lib/auth-client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { prisma } from "@/lib/db";
import { tryCatch } from "@/hooks/try-catch";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const clinics = [
    "Favoriten",
    "Florisdorf",
    "Hietzing",
    "Landstraße",
    "Mistelbach-Gänserndorf",
    "Landesklinikum Horn",
  ];

  const departments = [
    "Akutgeriatrie und Remobilisation",
    "Anästhesie und operative Intersivmedizin",
    "Chirurgie",
    "Gynäkologie und Geburtshilfe",
    "Infektions und Tropenmedizin",
    "Interdisziplinäre Wochenstation",
    "Kardiologie",
    "Kinder und Jugendheilkunde",
    "Nephrologie, Intensivmedizin, Diabetologie und Psyhosomatik",
    "Neurologie",
    "Onkologie und Hemätologie",
    "Psychiatrie",
    "Rheumatologie und Osteologie",
    "Urologie",
  ];

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      image: "",
      password: "",
      password_confirm: "",
    },
  });

  function onSubmit({ name, email, password }: SignUpSchemaType) {
    startTransition(async () => {
      await authClient.signUp.email({
        name,
        email,
        password,
        fetchOptions: {
          onSuccess: () => {
            toast.success("New user is successfully registered");
          },
          onError: (error) => {
            toast.error(error.error.message);
          },
        },
      });
    });
  }

  return (
    <Card className="w-full sm:max-w-[450px]">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2 w-full justify-center mb-6">
            <h1 className="text-lg font-semibold">
              <span className="text-xl font-bold">Create Doctor Profile</span>
            </h1>
          </div>
        </CardTitle>

        <CardDescription>
          A comprehensive platform designed to support your clinical research
          endeavors
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="example@test.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="*********" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password_confirm"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="*********" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="flex gap-2 w-full"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin ml-1" size={16} />{" "}
                  Registering...
                </>
              ) : (
                <>
                  <span>Register</span>
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
