import { format } from "date-fns";

export const formatDate = (date) => {
  if (date) {
    const inputDate = new Date(date);
    const formattedDate = format(inputDate, "dd/MM/yyyy");
    return formattedDate;
  }
  return "-";
};
