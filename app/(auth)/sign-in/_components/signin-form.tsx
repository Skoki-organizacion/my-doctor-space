"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { signInSchema, SignInSchemaType } from "@/lib/zod-schema";
import { Loader2, LogInIcon } from "lucide-react";
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
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignInForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit({ email, password }: SignInSchemaType) {
    const targetRoute =
      email === "milosstojsavljevic93@gmail.com"
        ? "/admin/dashboard"
        : "/dashboard";

    startTransition(async () => {
      await authClient.signIn.email({
        email,
        password,
        fetchOptions: {
          onSuccess: (_) => {
            router.push(targetRoute);
            toast.success("Welcome back");
          },
          onError: (error) => {
            toast.error(error.error.message ?? error.error.statusText);
          },
        },
      });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link
            href={"/"}
            className="flex items-center gap-2 w-full justify-center mb-6"
          >
            <Image
              src={"/logo.png"}
              alt={"Doctor space logo"}
              width={153}
              height={57}
              priority
            />
          </Link>
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

            <Button
              className="flex gap-2 w-full"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin ml-1" size={16} /> Logging
                  in...
                </>
              ) : (
                <>
                  <span className="flex gap-3 items-center">
                    <LogInIcon
                      className="text-white group-data-[active=true]/menu-button:text-primary"
                      size={22}
                      aria-hidden="true"
                    />{" "}
                    Login
                  </span>
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <div className={cn("flex flex-col gap-6")}>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our{" "}
            <Link href={"terms"}>Terms of Service</Link> and{" "}
            <Link href={"privacy"}>Privacy Policy</Link>.
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
