import { format } from "date-fns";

export const dateFormat = (date: Date): string => {
  const formattedDate = format(date, "dd MMMM yyyy");
  const parts = formattedDate.split(" ");

  return `${parts[0]} ${parts[1].charAt(0).toUpperCase() + parts[1].slice(1)} ${
    parts[2]
  }`;
};
