"use client";

import {useId, useState, useTransition} from "react";
import {format} from "date-fns";
import {CalendarIcon, Loader2, Save, X} from "lucide-react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {Label} from "@/components/ui/label";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Textarea} from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {studyDetailSchema, StudyDetailSchemaType} from "@/lib/zod-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {tryCatch} from "@/hooks/try-catch";
import {saveDoctorInfo, updateDoctorInfo} from "../[id]/actions";
import {toast} from "sonner";
import {usePathname} from "next/navigation";
import {GetStudyType} from "@/app/data/admin/get-study";

type iAppProps = {
  id: number;
  checked: boolean;
  title: string;
  field: string;
};

export default function CalendarItem({
  item,
  currentItem,
}: {
  item: Pick<GetStudyType, "items">["items"][0] | undefined;
  currentItem: iAppProps;
}) {
  const id = useId();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const selectedItem = item?.name === currentItem.field;

  const form = useForm<StudyDetailSchemaType>({
    resolver: zodResolver(studyDetailSchema),
    defaultValues: {
      name: currentItem.field,
      date: selectedItem && item?.date ? item.date : undefined,
      description: selectedItem && item?.description ? item.description : "",
      doctorId: selectedItem && item?.doctorId ? item.doctorId : "",
      checked: selectedItem && item?.checked ? item.checked : true,
    },
  });

  function onSubmit(values: StudyDetailSchemaType) {
    const pathList = pathname.split("/");
    const doctorId = pathList[pathList.length - 1];

    const finalValues = {...values, doctorId, name: currentItem.field};

    startTransition(async () => {
      const {data: result, error} = selectedItem
        ? await tryCatch(updateDoctorInfo(item.id, finalValues))
        : await tryCatch(saveDoctorInfo(finalValues));

      if (error) {
        toast.error("An unexpected error occured");
      }

      if (result?.status === "success") {
        toast.success(result.message);
      } else if (result?.status === "error") {
        toast.error(result.message);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col h-full"
      >
        <div className="flex flex-col gap-4 h-11/12">
          <div className="*:not-first:mt-2">
            <Label htmlFor={id}>Date picker</Label>
            <FormField
              control={form.control}
              name="date"
              render={({field}) => (
                <FormItem className="w-full">
                  <Popover open={isOpen} onOpenChange={setIsOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        id={id}
                        variant={"outline"}
                        className="group w-full justify-between px-3 font-normal text-left hover:bg-background focus-visible:outline-[3px] outline-none outline-offset-0 border-input"
                      >
                        <span
                          className={cn(
                            "truncate",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? format(field.value, "PPP")
                            : "Pick a date"}
                        </span>
                        <CalendarIcon
                          size={16}
                          className="shrink-0 text-muted-foreground/80 transition-colors group-hover:text-foreground"
                          aria-hidden="true"
                        />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <div className="flex justify-end p-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setIsOpen(false)}
                          className="h-7 w-7"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        numberOfMonths={2}
                        className="p-0"
                        classNames={{
                          table: "w-full border-collapse table-fixed",
                        }}
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
            render={({field}) => (
              <FormItem className="w-full flex flex-col flex-grow">
                <FormLabel>Description</FormLabel>
                <FormControl className="flex-grow">
                  <Textarea
                    className="bg-background h-full box-border"
                    {...field}
                  />
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
                <Loader2 className="animate-spin ml-1" size={16} /> Saving...
              </>
            ) : (
              <>
                <span className="flex gap-3 items-center">
                  <Save
                    className="text-white group-data-[active=true]/menu-button:text-primary size-4"
                    aria-hidden="true"
                  />{" "}
                  Save
                </span>
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
