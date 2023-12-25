import { Checkbox } from "<components>/shared/Checkbox";
import React, { useState } from "react";
import { FilterList } from "./FilterList";
import { useStore } from "@data/filters.store";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

const FilterButton = () => {
  const { filters, setFilters } = useStore();

  const handleFilterChange = (category: string, value: string) => {
    setFilters(category, value);
  };

  const dates: DateValueType = {
    startDate: filters.startDate,
    endDate: filters.endDate,
  };

  const handleValueChange = (value: DateValueType) => {
    if (value !== null) {
      setFilters("startDate", value.startDate as Date);
      setFilters("endDate", value.endDate as Date);
    }
  };
  return (
    <div className="dark:bg-gray-800">
      <div className="relative z-9999 ">
        <Datepicker
          primaryColor={"red"}
          value={dates}
          onChange={handleValueChange}
          showShortcuts={true}
        />
      </div>
      <div className="relative">
        <div>
          <label className="text-lg font-semibold mb-2 block dark:text-white">
            Age Filter:
          </label>
          <FilterList
            category="age"
            filterItems={["All", "15-25", ">25"]}
            selectedFilter={filters.age}
            onChange={handleFilterChange}
          />
        </div>

        <div>
          <label className="text-lg font-semibold mb-2 block dark:text-white">
            Gender Filter:
          </label>
          <FilterList
            category="gender"
            filterItems={["All", "Male", "Female"]}
            selectedFilter={filters.gender}
            onChange={handleFilterChange}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterButton;
