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
  date: string,
  startDate: Date,
  endDate: Date
): boolean => {
  const d = convertDate(date);
  const startD = startDate;
  const endD = endDate;
  return d >= startD && d <= endD;
};

export const convertToProductDataInRange = (
  data: DataType[],
  startDate: Date,
  endDate: Date,
  productNames: string[],
  age?: AgeType,
  gender?: GenderType
): { products: ProductData[]; dates: Date[] } => {
  let filteredData = data.filter((d) =>
    isDateInRange(d.day, startDate, endDate)
  );

  if (age && age !== "All") {
    filteredData = filteredData.filter((d) => d.age === age);
  }

  if (gender && gender !== "All") {
    filteredData = filteredData.filter((d) => d.gender === gender);
  }

  const dates = Array.from(
    new Set(filteredData.map((d) => convertDate(d.day).getTime()))
  )
    .map((t) => new Date(t))
    .sort((a, b) => a.getTime() - b.getTime());

  const products: ProductData[] = productNames.map((name) => ({
    name,
    data: [],
  }));

  dates.forEach((date) => {
    const filteredByDateData = filteredData.filter(
      (d) => convertDate(d.day).getTime() === date.getTime()
    );

    productNames.forEach((name, index) => {
      const sum = filteredByDateData.reduce(
        (acc, curr) => acc + (curr[name as keyof DataType] as number),
        0
      );
      products[index].data.push(sum);
    });
  });
  return { products, dates };
};
