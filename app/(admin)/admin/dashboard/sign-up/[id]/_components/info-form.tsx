"use client";

import { listOfClinics, listOfDepartments } from "@/app/constant/clinic-info";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tryCatch } from "@/hooks/try-catch";
import { confirmUserSchema, ConfirmUserSchemaType } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import addDoctorInfo from "../actions";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function AdditionalInfoForm({ id }: { id: string }) {
  const clinics = listOfClinics;
  const departments = listOfDepartments;
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const form = useForm<ConfirmUserSchemaType>({
    resolver: zodResolver(confirmUserSchema),
    defaultValues: {
      userId: id,
      clinic: "",
      department: "",
      study: "",
    },
  });

  function onSubmit(values: ConfirmUserSchemaType) {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(addDoctorInfo(values));

      if (error) {
        toast.error("An unexpected error occured");
      }

      if (result?.status === "success") {
        toast.success(result.message);
        form.reset();
        router.push("/admin/dashboard");
      } else if (result?.status === "error") {
        toast.error(result.message);
      }
    });
  }

  return (
    <Card className="w-full sm:max-w-[450px]">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2 w-full justify-center mb-6">
            <h1 className="text-lg font-semibold">
              <span className="text-xl font-bold">Provide additional info</span>
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
              name="clinic"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Clinic</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select clinic" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {clinics.map((clinic) => (
                        <SelectItem
                          key={clinic}
                          value={clinic}
                          className="cursor-pointer"
                        >
                          {clinic}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Department</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full max-w-[300px] sm:max-w-[400px]">
                        <SelectValue
                          placeholder="Select department"
                          className="truncate"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full max-w-[300px] sm:max-w-[400px]">
                      {departments.map((department) => (
                        <SelectItem
                          key={department}
                          value={department}
                          className="cursor-pointer"
                        >
                          {department}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="study"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Study</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Study" />
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
                  <Loader2 className="animate-spin ml-1" size={16} /> Adding
                  info...
                </>
              ) : (
                <>
                  <span>Add additional info</span>
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
