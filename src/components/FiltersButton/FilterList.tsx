import React, { useState } from "react";
import { Checkbox } from "<components>/shared/Checkbox";

interface FilterListProps {
  category: string;
  filterItems: string[];
  selectedFilter: string;
  onChange: (category: string, value: string) => void;
}

export const FilterList: React.FC<FilterListProps> = ({
  category,
  filterItems,
  selectedFilter,
  onChange,
}) => {
  return (
    <ul className="filter-switch inline-flex items-center relative h-10 p-1 space-x-1 bg-gray-200 rounded-md font-semibold text-blue-600 my-4">
      {filterItems.map((filterItem, index) => (
        <li
          key={index}
          className="filter-switch-item flex relative h-8 bg-gray-300x"
        >
          <Checkbox
            id={`${category}-${index + 1}`}
            name={category}
            value={filterItem}
            checked={selectedFilter === filterItem}
            onChange={() => onChange(category, filterItem)}
            label={
              <span
                className={`inline-flex items-center ${
                  selectedFilter === filterItem
                    ? "text-blue-600"
                    : "text-gray-600"
                }`}
              >
                {selectedFilter === filterItem && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                    />
                  </svg>
                )}
                {filterItem}
              </span>
            }
          />
        </li>
      ))}
    </ul>
  );
};
