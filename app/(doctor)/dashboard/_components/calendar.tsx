"use client";

import { useId, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { studyDetailSchema, StudyDetailSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";

type iAppProps = {
  id: number;
  checked: boolean;
  title: string;
  field: string;
};

export default function CalendarItem({
  currentItem,
}: {
  currentItem: iAppProps;
}) {
  const id = useId();
  const [date, setDate] = useState<Date | undefined>();

  const form = useForm<StudyDetailSchema>({
    resolver: zodResolver(studyDetailSchema),
    defaultValues: {
      name: undefined,
      description: "",
    },
  });

  function onSubmit() {
    console.log(form.getValues(), "ovde je forma");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="*:not-first:mt-2">
            <Label htmlFor={id}>Date picker</Label>
            <FormField
              control={form.control}
              name={"name" as any}
              render={({ field }) => (
                <FormItem className="w-full">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id={id}
                        variant={"outline"}
                        className="group w-full justify-between px-3 font-normal text-left hover:bg-background focus-visible:outline-[3px] outline-none outline-offset-0 border-input"
                      >
                        <span
                          className={cn(
                            "truncate",
                            !date && "text-muted-foreground"
                          )}
                        >
                          {date ? format(date, "PPP") : "Pick a date"}
                        </span>
                        <CalendarIcon
                          size={16}
                          className="shrink-0 text-muted-foreground/80 transition-colors group-hover:text-foreground"
                          aria-hidden="true"
                        />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value as unknown as Date}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-background h-full box-border"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
