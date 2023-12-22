import { AgeType, DataType, GenderType } from "../data";

export type ProductData = {
  name: string;
  data: number[];
};

export const convertDate = (dateStr: string): Date => {
  const parts = dateStr.split("/");
  return new Date(`${parts[1]}/${parts[0]}/${parts[2]}`);
};

export const isDateInRange = (
  date: Date,
  startDate: Date,
  endDate: Date
): boolean => {
  return date >= startDate && date <= endDate;
};

export const convertToProductDataInRange = (
  data: DataType[],
  startDate: Date,
  endDate: Date,
  productNames: string[],
  age?: AgeType,
  gender?: GenderType
): { products: ProductData[]; dates: Date[] } => {
  const filteredData = data.filter((d) =>
    isDateInRange(convertDate(d.day), startDate, endDate) &&
    (!age || age === "All" || d.age === age) &&
    (!gender || gender === "All" || d.gender === gender)
  );

  const uniqueDates = Array.from(
    new Set(filteredData.map((d) => convertDate(d.day)))
  ).sort((a, b) => a.getTime() - b.getTime());

  const products: ProductData[] = productNames.map((name) => ({
    name,
    data: [],
  }));

  uniqueDates.forEach((date) => {
    productNames.forEach((name, index) => {
      const sum = filteredData
        .filter((d) => convertDate(d.day).getTime() === date.getTime())
        .reduce((acc, curr) => acc + (curr[name as keyof DataType] as number), 0);

      products[index].data.push(sum);
    });
  });

  return { products, dates: uniqueDates };
};
