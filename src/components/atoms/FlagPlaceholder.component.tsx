import classNames from "classnames";
import { HTMLAttributes } from "react";
import { CountryCode } from "src/interfaces/app/ForeignExchange.types";

export interface FlagPlaceholderProps extends HTMLAttributes<HTMLDivElement> {
  countryCode: CountryCode;
  "data-testid"?: string;
}

export const FlagPlaceholder = ({
  countryCode,
  className,
  ...props
}: FlagPlaceholderProps) => {
  return (
    <div
      className={classNames(
        "bg-white border border-gray-300 rounded-md w-9 h-6 text-sm font-semibold text-gray-500 flex justify-center items-center select-none",
        className
      )}
      {...props}
    >
      {countryCode}
    </div>
  );
};
