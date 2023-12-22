import { DataType } from "../data";
import { convertDate, isDateInRange } from "./convertToProductDataInRange";

export const convertToOneProductDataInRange = (
  data: DataType[],
  startDate: Date,
  endDate: Date,
  productNames: string[]
): { product: { date: Date; total: number }[] } => {
  const filteredData = data.filter((d) =>
    isDateInRange(convertDate(d.day), startDate, endDate)
  );

  const uniqueDates = Array.from(
    new Set(filteredData.map((d) => convertDate(d.day)))
  ).sort((a, b) => a.getTime() - b.getTime());

  const products: { date: Date; total: number }[] = [];

  uniqueDates.forEach((date) => {
    let total = 0;
    productNames.forEach((name) => {
      const sum = filteredData
        .filter((d) => convertDate(d.day).getTime() === date.getTime())
        .reduce(
          (acc, curr) => acc + (curr[name as keyof DataType] as number),
          0
        );
      total += sum;
    });
    products.push({ date, total });
  });

  return { product: products };
};
