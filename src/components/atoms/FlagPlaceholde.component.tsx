import classNames from "classnames";
import { HTMLAttributes } from "react";
import { CountryCode } from "src/interfaces/app/ForeignExchange.interface";

export interface FlagPlaceholderProps extends HTMLAttributes<HTMLDivElement> {
  countryCode: CountryCode;
}

export const FlagPlaceholder = ({
  countryCode,
  className,
}: FlagPlaceholderProps) => {
  return (
    <div
      className={classNames(
        "bg-white border border-gray-300 rounded-md w-9 h-6 text-sm font-semibold text-gray-500 flex justify-center items-center",
        className
      )}
    >
      {countryCode}
    </div>
  );
};
