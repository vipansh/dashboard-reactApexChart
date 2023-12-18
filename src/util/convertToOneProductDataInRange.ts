import { DataType } from "../data";
import { convertDate, isDateInRange } from "./convertToProductDataInRange";

export const convertToOneProductDataInRange = (
  data: DataType[],
  startDate: Date,
  endDate: Date,
  productNames: string[]
): { product: { date: Date; total: number }[] } => {
  const filteredData = data.filter((d) =>
    isDateInRange(d.day, startDate, endDate)
  );

  const dates = Array.from(
    new Set(filteredData.map((d) => convertDate(d.day).getTime()))
  )
    .map((t) => new Date(t))
    .sort((a, b) => a.getTime() - b.getTime());

  const products: { date: Date; total: number }[] = [];

  dates.forEach((date) => {
    let total = 0;
    productNames.forEach((name) => {
      const sum = filteredData.reduce(
        (acc, curr) => {
          if (convertDate(curr.day).getTime() === date.getTime()) {
            return acc + (curr[name as keyof DataType] as number);
          }
          return acc;
        },
        0
      );
      total += sum;
    });
    products.push({ date, total });
  });
  return { product: products };
};
