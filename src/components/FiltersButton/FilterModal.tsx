import React, { useState } from "react";
import { AgeType, GenderType } from "../../types/index";

interface FilterConfig {
  name: string;
  options: (AgeType | GenderType)[];
}

const FilterModal = () => {
  const initialFilters: Record<string, AgeType | GenderType> = {
    age: "All",
    gender: "All",
  };

  const [filters, setFilters] = useState(initialFilters);

  const handleFilterChange = (
    filterName: string,
    filterValue: AgeType | GenderType
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: filterValue,
    }));
  };

  const applyFilters = () => {
    // Use the selected filters as needed (e.g., send them to an API)
    console.log("Selected Filters:", filters);
  };

  const filtersConfig: FilterConfig[] = [
    { name: "age", options: ["All", "15-25", ">25"] },
    { name: "gender", options: ["All", "Male", "Female"] },
    // Add more filters as needed
  ];

  return (
    <div>
      <div className="">
        {filtersConfig.map(({ name, options }, index) => (
          <details
            key={index}
            className="overflow-hidden rounded border border-gray-300 dark:border-gray-600"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition dark:bg-boxdark dark:border-gray-900 dark:text-white">
              <span className="text-sm font-medium">{name}</span>
              <span className="transition transform group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </summary>

            <div className="border-t border-gray-200 bg-white dark:border-gray-900 dark:bg-boxdark dark:text-white">
              <ul className="space-y-1 border-t border-gray-200 p-4 dark:border-gray-900 dark:bg-boxdark">
                {options.map((value) => (
                  <li key={value}>
                    <label
                      htmlFor={`Filter${name}${value}`}
                      className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-200"
                    >
                      <input
                        type="checkbox"
                        id={`Filter${name}${value}`}
                        className="h-5 w-5 rounded border-gray-300 dark:border-gray-900 dark:bg-boxdark dark:text-white dark:focus:ring-offset-gray-900"
                        checked={filters[name] === value}
                        onChange={() => handleFilterChange(name, value)}
                      />
                      <span className="text-sm font-medium">{value}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>
      <button
        type="button"
        onClick={applyFilters}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterModal;




