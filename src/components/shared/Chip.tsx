import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const chip = cva("div", {
  variants: {
    size: {
      small: [" text-xs p-1 m-1 rounded-md"],
      medium: [" text-sm p-2 m-2 rounded-xl"],
    },
    intent: {
      primary: [
        `text-white bg-primary border-2 border-white `,
        `dark:text-white dark:bg-$boxdark dark:border-gray-900`,
      ],
      secondary: [
        `text-white bg-secondary border-2 border-white `,
        `dark:text-white dark:bg-boxdark dark:border-gray-900`,
      ],
    },
  },
  defaultVariants: {
    size: "medium",
    intent: "primary",
  },
});

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chip> {}

export const Chip: React.FC<ChipProps> = ({
  className,
  size,
  intent,
  ...props
}) => <div className={chip({ size, intent, className })} {...props} />;
