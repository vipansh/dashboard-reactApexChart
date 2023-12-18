import React, { useState } from "react";
import { convertToProductDataInRange } from "../util/convertToProductDataInRange";
import BarGraph from "./barGraph/BarGraph";
import Image from "next/image";

import { data } from "../data";

type Props = {};
const startDate = "4/10/2022";
const endDate = "29/10/2022";
const ChartComponent = (props: Props) => {
  const [selectedProducts, setSelectedProducts] = useState([
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSelectedProducts((prev) =>
      checked ? [...prev, name] : prev.filter((product) => product !== name)
    );
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      {["a", "b", "c", "d", "e", "f"].map((product) => (
        <div key={product} className="flex items-center space-x-3">
          <input
            type="checkbox"
            name={product}
            checked={selectedProducts.includes(product)}
            onChange={handleCheckboxChange}
            className="form-checkbox h-5 w-5 text-blue-600"
            id={product}
          />
          <label htmlFor={product} className="font-medium text-gray-700">
            {product}
          </label>
        </div>
      ))}
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
        />
      </div>
    </div>
  );
};
export default ChartComponent;
