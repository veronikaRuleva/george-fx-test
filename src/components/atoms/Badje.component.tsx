import classNames from "classnames";
import { HTMLAttributes } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {}

export const Badge = ({ children, className }: BadgeProps) => (
  <div
    className={classNames(
      "border rounded-xl px-1 text-xs flex items-center justify-center grow shrink-0 self-center",
      { "bg-gray-50": !className?.includes("bg-") },
      { "border-gray-200": !className?.includes("border-") },
      { "text-gray-700": !className?.includes("text-") }
    )}
  >
    {children}
  </div>
);
