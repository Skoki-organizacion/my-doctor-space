import { format } from "date-fns";

export const dateFormat = (date: Date): string => format(date, "dd MMMM yyyy");
