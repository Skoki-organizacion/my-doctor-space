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
import { Label } from "@/components/ui/label";
import { tryCatch } from "@/hooks/try-catch";
import { cn } from "@/lib/utils";
import { signInSchema, SignInSchemaType } from "@/lib/zod-schema";
import { GalleryVerticalEnd } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import signInAction from "../actions";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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

  function onSubmit(values: SignInSchemaType) {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(signInAction(values));

      if (error) {
        toast.error("An unexpected error occured");
      }

      if (result?.status === "success") {
        toast.success(result.message);
        form.reset();
        router.push("/dashboard");
      } else if (result?.status === "error") {
        toast.error(result.message);
      }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2 w-full justify-center mb-6">
            <div className="flex size-8 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-6" />
            </div>

            <h1 className="text-lg font-semibold">
              <span className="text-xl font-bold">Doctor space</span>
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
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
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
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full">Sign in</Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <div className={cn("flex flex-col gap-6")}>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
