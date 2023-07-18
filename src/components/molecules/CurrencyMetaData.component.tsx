import { HTMLAttributes } from "react";
import classNames from "classnames";
import { CountryMetaData } from "./CountryMetaData.component";
import { CountryWithFlag } from "src/interfaces/app/ForeignExchange.interface";

export interface CurrencyMetaDataProps extends HTMLAttributes<HTMLDivElement> {
  isUsedInMultipleCountries: boolean | undefined;
  country: CountryWithFlag;
}

export const CurrencyMetaData = ({
  className,
  isUsedInMultipleCountries,
  country,
}: CurrencyMetaDataProps) => {
  if (!country) return null;

  return (
    <div className={classNames("flex flex-col gap-y-2", className)}>
      <CountryMetaData country={country} />

      {isUsedInMultipleCountries && (
        <span className="text-xs text-gray-500">
          used in multiple countries
        </span>
      )}
    </div>
  );
};
