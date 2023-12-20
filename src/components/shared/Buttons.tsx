

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const button = cva("button", {
  variants: {
    size: {
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
      black: [
        "bg-black text-white border border-black hover:bg-opacity-90",
        "dark:bg-boxdark dark:border-gray-900",
      ],
      meta3: [
        "bg-meta-3 text-white border border-meta-3 hover:bg-opacity-90",
        "dark:bg-boxdark dark:border-gray-900",
      ],
    },
    shape: {
      rounded: ["rounded-md"],
      circle: ["rounded-full"],
    },
  },
  defaultVariants: {
    size: "medium",
    intent: "primary",
    shape: "rounded",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button: React.FC<ButtonProps> = ({
  className,
  size,
  intent,
  shape,
  ...props
}) => (
  <button
    type="button"
    className={`${button({ size, intent, shape, className })} inline-flex items-center justify-center`}
    {...props}
  />
);
