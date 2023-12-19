import React, { useState, ChangeEvent } from "react";
import {
  ProductData,
  convertToProductDataInRange,
} from "../util/convertToProductDataInRange";
import BarGraph from "./barGraph/BarGraph";
import { AgeType, DataType, GenderType, data } from "../data";
import Select from "./shared/Select";

const ChartComponent: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>(new Date("2022-10-03"));
  const [endDate, setEndDate] = useState<Date>(new Date("2022-10-29"));
  const [age, setAge] = useState<AgeType>("All");
  const [gender, setGender] = useState<GenderType>("All");

  const handleDateChange = (
    event: ChangeEvent<HTMLInputElement>,
    setDate: React.Dispatch<React.SetStateAction<Date>>
  ) => {
    setDate(new Date(event.target.value));
  };

  const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleDateChange(event, setStartDate);
  };

  const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleDateChange(event, setEndDate);
  };

  const { products, dates } = convertToProductDataInRange(
    data,
    startDate,
    endDate,
    ["a", "b", "c", "d", "e", "f"],
    age,
    gender
  );

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
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
          className="input input-bordered input-primary w-full max-w-xs"
          id="endDate"
          type="date"
          value={endDate.toISOString().substring(0, 10)}
          onChange={handleEndDateChange}
        />
      </div>
      <div className="mt-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="age"
        >
          Age
        </label>
        <Select<AgeType>
          options={["All", "15-25", ">25"]}
          defaultOption="All"
          onSelect={setAge}
        />
      </div>
      <div className="mt-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="gender"
        >
          Gender
        </label>
        <Select<GenderType>
          options={["All", "Male", "Female"]}
          defaultOption="All"
          onSelect={setGender}
        />
      </div>
      <div className="mt-6">
        <BarGraph
          products={products}
          dates={dates}
          startDate={startDate}
          endDate={endDate}
          data={data}
        />
      </div>
    </div>
  );
};

export default ChartComponent;
