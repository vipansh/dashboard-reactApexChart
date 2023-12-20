import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const badge = cva("div", {
  variants: {
    size: {
      small: ["w-6 h-6 text-xs"],
      medium: ["w-8 h-8 text-sm"],
    },
    intent: {
      primary: [
        `text-white bg-primary border-2 border-white rounded-full`,
        `dark:text-white dark:bg-$boxdark dark:border-gray-900`,
      ],
      secondary: [
        `text-white bg-secondary border-2 border-white rounded-full`,
        `dark:text-white dark:bg-boxdark dark:border-gray-900`,
      ],
    },
  },
  defaultVariants: {
    size: "small",
    intent: "primary",
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badge> {}

export const Badge: React.FC<BadgeProps> = ({
  className,
  size,
  intent,
  ...props
}) => <div className={badge({ size, intent, className })} {...props} />;
