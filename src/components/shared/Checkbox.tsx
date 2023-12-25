import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const checkbox = cva("input", {
  variants: {
    variant: {
      small: ["text-sm px-4 py-2"],
      medium: ["text-base px-6 py-3"],
      large: ["text-lg px-8 py-4"],
    },
    intent: {
      primary: [
        "bg-primary text-white border border-primary hover:bg-opacity-90",
        "dark:bg-boxdark dark:border-gray-900",
      ],
      secondary: [
        "bg-secondary text-white border border-secondary hover:bg-opacity-90",
        "dark:bg-boxdark dark:border-gray-900",
      ],
    },
    shape: {
      rounded: ["rounded-md"],
      circle: ["rounded-full"],
    },
    isChecked: {
      highlight: ["ring-2 ring-primary"],
    },
  },
  defaultVariants: {
    variant: "medium",
    intent: "primary",
    shape: "rounded",
  },
});

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof checkbox> {
  label?: React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  className,
  variant,
  intent,
  shape,
  label,
  ...props
}) => (
  <>
    <input type="checkbox" className="sr-only" {...props} />
    <label
      className={`${checkbox({
        variant,
        intent,
        shape,
        className,
        isChecked: props.checked ? "highlight" : undefined,
      })} inline-flex items-center justify-center cursor-pointer`}
      htmlFor={props.id}
    >
      {label}
    </label>
  </>
);
