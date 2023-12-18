import { DataType } from "../data";

export type ProductData = {
  name: string;
  data: number[];
};

const convertDate = (dateStr: string): Date => {
  const parts = dateStr.split("/");
  return new Date(`${parts[1]}/${parts[0]}/${parts[2]}`);
};

const isDateInRange = (
  date: string,
  startDate: string,
  endDate: string
): boolean => {
  const d = convertDate(date);
  const startD = convertDate(startDate);
  const endD = convertDate(endDate);
  return d >= startD && d <= endD;
};

export function convertToProductDataInRange(
  data: DataType[],
  startDate: string,
  endDate: string,
  productNames: string[]
): { products: ProductData[]; dates: Date[] } {
  // Filter data by date range
  const filteredData = data.filter((d) =>
    isDateInRange(d.day, startDate, endDate)
  );

  // Extract unique dates and sort them

  const dates = Array.from(
    new Set(filteredData.map((d) => convertDate(d.day).getTime()))
  )
    .map((t) => new Date(t))
    .sort((a, b) => a.getTime() - b.getTime());

  const products: ProductData[] = productNames.map((name) => ({
    name,
    data: [],
  }));

  // Aggregate values for each product by date
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
}
