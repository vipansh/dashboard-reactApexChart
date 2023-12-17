"use client";

import Image from "next/image";
import {
  aggregateDataInRange,
  convertToProductDataInRange,
} from "../util/aggregateDataInRange";
import { data } from "../data";
import BarGraph from "<components>/barGraph/BarGraph";

const startDate = "4/10/2022";
const endDate = "29/10/2022";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <BarGraph
        products={
          convertToProductDataInRange(data, startDate, endDate).products
        }
        dates={convertToProductDataInRange(data, startDate, endDate).dates}
      />
      Testing
    </main>
  );
}
