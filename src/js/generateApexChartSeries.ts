import { DataType } from "../data";

type FormattedData = {
  series: ApexAxisChartSeries;
  dates: Date[];
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

export const generateApexChartSeries = (
  data: DataType[],
  startDate: Date,
  endDate: Date
): FormattedData => {
  const dates: Date[] = [];

  const formattedData: FormattedData = { series: [], dates };

  const filteredData = data.filter((entry) => {
    const entryDate = convertDate(entry.day);
    return entryDate >= startDate && entryDate <= endDate;
  });

  const series: { [key: string]: number[] } = {};
  console.log({ filteredData, data, startDate, endDate });
  for (let i = 0; i < filteredData.length; i++) {
    const data = filteredData[i];
    const lastData = filteredData[i - 1] || {};
    // passing the date if not present
    if (lastData?.day !== data.day) {
      const entryDate = convertDate(data.day);
      dates.push(entryDate);

      Object.keys(data).forEach((key) => {
        if (key !== "day" && key !== "age" && key !== "gender") {
          series[key] = series[key] || [];
          series[key].push(data[key] as number);
        }
      });
    } else {
      Object.keys(data).forEach((key) => {
        if (key !== "day" && key !== "age" && key !== "gender") {
          series[key] = series[key] || [];
          series[key][series[key].length - 1] += data[key] as number;
        }
      });
    }
  }

  formattedData.dates = dates;
  formattedData.series = Object.keys(series).map((key) => ({
    name: key,
    data: series[key],
  }));

  return formattedData;
};

// // Example usage
// const startDate = "2022-10-10";
// const endDate = "2022-10-20";

// const formattedChartData = generateApexChartSeries(data, startDate, endDate);
// console.log(formattedChartData);
