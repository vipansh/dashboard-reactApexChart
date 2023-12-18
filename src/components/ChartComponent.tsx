import React, { useState } from "react";
import {
  ProductData,
  convertToProductDataInRange,
} from "../util/convertToProductDataInRange";
import BarGraph from "./barGraph/BarGraph";

import { DataType, data } from "../data";

const ChartComponent = () => {
  const [selectedProducts, setSelectedProducts] = useState([
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ]);
  const [startDate, setStartDate] = useState<Date>(new Date("2022-10-03"));
  const [endDate, setEndDate] = useState<Date>(new Date("2022-10-29"));

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSelectedProducts((prev) =>
      checked
        ? [...prev, name].sort()
        : prev.filter((product) => product !== name).sort()
    );
  };

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(new Date(event.target.value));
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(new Date(event.target.value));
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg ">
      {["a", "b", "c", "d", "e", "f"].map((product) => (
        <div key={product} className="flex items-center space-x-3">
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text mr-4">{product}</span>
              <input
                type="checkbox"
                name={product}
                checked={selectedProducts.includes(product)}
                onChange={handleCheckboxChange}
                id={product}
                className="checkbox checkbox-primary checkbox-md"
              />
            </label>
          </div>
        </div>
      ))}

      <div className="mt-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="startDate"
        >
          Start Date
        </label>
        <input
          className="input input-bordered input-primary w-full max-w-xs"
          id="startDate"
          type="date"
          value={startDate.toISOString().substring(0, 10)}
          onChange={handleStartDateChange}
        />
      </div>
      <div className="mt-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="endDate"
        >
          End Date
        </label>
        <input
          className="input input-bordered input-primary w-full max-w-xs "
          id="endDate"
          type="date"
          value={endDate.toISOString().substring(0, 10)}
          onChange={handleEndDateChange}
        />
      </div>
      <div className="mt-6">
        <BarGraph
          products={
            convertToProductDataInRange(
              data,
              startDate,
              endDate,
              selectedProducts
            ).products
          }
          dates={
            convertToProductDataInRange(
              data,
              startDate,
              endDate,
              selectedProducts
            ).dates
          }
          startDate={startDate}
          endDate={endDate}
          data={data}
        />
      </div>
    </div>
  );
};
export default ChartComponent;
