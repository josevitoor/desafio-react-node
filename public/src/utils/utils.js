import { format } from "date-fns";

export const formatDate = (date) => {
  if (date) {
    const inputDate = new Date(date);
    const formattedDate = format(inputDate, "dd/MM/yyyy");
    return formattedDate;
  }
  return "-";
};

export const formatValueInReal = (valueInCentavos) => {
  if (typeof valueInCentavos === "number") {
    const valueInReais = valueInCentavos / 100;
    const formattedValue = valueInReais.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
    return formattedValue;
  }
  return "R$ 0,00";
};

export const getByKey = (list, value) => {
  const found = list.find((i) => i["value"] === value);
  return found ? found["text"] : "-";
};
