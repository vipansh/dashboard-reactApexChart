import React, { useState } from 'react';

interface SelectProps<T> {
  options: T[];
  defaultOption: T;
  onSelect: (value: T) => void;
}

const Select = <T extends string | number>({ options, defaultOption, onSelect }: SelectProps<T>) => {
  const [selectedValue, setSelectedValue] = useState<T>(defaultOption);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as T;
    setSelectedValue(value);
    onSelect(value);
  };

  return (
    <select value={selectedValue} onChange={handleChange} className="select select-bordered w-full max-w-xs">
      <option disabled>{String(defaultOption)}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {String(option)}
        </option>
      ))}
    </select>
  );
};

export default Select;
