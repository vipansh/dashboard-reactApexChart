import { Checkbox } from "<components>/shared/Checkbox";
import React, { useState } from "react";
import { FilterList } from "./FilterList";

const FilterButton = () => {
  const [filters, setFilters] = useState({
    age: "All",
    gender: "All",
  });

  const handleFilterChange = (category: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: value,
    }));
  };

  return (
    <>
      <div className="relative">
        <div className="relative">
          <div>
            <label className="text-lg font-semibold mb-2 block">
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
            <label className="text-lg font-semibold mb-2 block">
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
    </>
  );
};

export default FilterButton;
