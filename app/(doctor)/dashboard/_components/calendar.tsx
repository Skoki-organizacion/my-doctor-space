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
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { studyDetailSchema, StudyDetailSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function CalendarItem() {
  const id = useId();
  const [date, setDate] = useState<Date | undefined>();

  const form = useForm<StudyDetailSchema>({
    resolver: zodResolver(studyDetailSchema),
    defaultValues: {
      erhalt: undefined,
      erhaltComment: "",
      meldung: undefined,
      meldungComment: "",
      vorprufung: undefined,
      vorprufungComment: "",
      kenntnisnahme: undefined,
      kenntnisnahmeComment: "",
      detailprufung: undefined,
      detailprufungComment: "",
      freigabe: undefined,
      freigabeComment: "",
      bewertung: undefined,
      bewertungComment: "",
      genehmigung: undefined,
      genehmigungComment: "",
      verhandlung: undefined,
      verhandlungComment: "",
      festlegung: undefined,
      festlegungComment: "",
      abschluss: undefined,
      abschlussComment: "",
      vorbereitung: undefined,
      vorbereitungComment: "",
      studien: undefined,
      studienComment: "",
      durchfuhrung: undefined,
      durchfuhrungComment: "",
      patienten_one: undefined,
      patienten_oneComment: "",
      stand_one: undefined,
      stand_oneComment: "",
      patienten_two: undefined,
      patienten_twoComment: "",
      stand_two: undefined,
      stand_twoComment: "",
      patienten_three: undefined,
      patienten_threeComment: "",
      stand_three: undefined,
      stand_threeComment: "",
      ubernahme: undefined,
      ubernahmeComment: "",
    },
  });

  function onSubmit() {
    console.log("ovde je forma");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="*:not-first:mt-2">
            <Label htmlFor={id}>Date picker</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id={id}
                  variant={"outline"}
                  className="group w-full justify-between px-3 font-normal text-left hover:bg-background focus-visible:outline-[3px] outline-none outline-offset-0 border-input"
                >
                  <span
                    className={cn("truncate", !date && "text-muted-foreground")}
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
              <PopoverContent className="w-auto p-2" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                  className="p-0"
                  classNames={{
                    table: "w-full border-collapse table-fixed",
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          <Textarea className="bg-background h-full" />
        </div>
      </form>
    </Form>
  );
}
