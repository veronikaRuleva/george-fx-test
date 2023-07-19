import classNames from "classnames";
import { HTMLAttributes } from "react";
import { findIndexByCurrencyCode } from "src/functions/countryUtils";
import {
  CountryWithFlag,
  CurrencyCode,
} from "src/interfaces/app/ForeignExchange.types";
import { CountryMetaData } from "./CountryMetaData.component";
import { Flag } from "./Flag.component";

export interface CurrencyMetaDataProps extends HTMLAttributes<HTMLDivElement> {
  countries: CountryWithFlag[] | [];
  currencyCode: CurrencyCode;
  "data-testid"?: string;
}

export const CurrencyMetaData = ({
  className,
  countries,
  currencyCode,
  ...props
}: CurrencyMetaDataProps) => {
  if (!countries || countries.length === 0) return null;

  const countryIndex = findIndexByCurrencyCode(countries, currencyCode);

  return (
    <div className={classNames("flex flex-col gap-y-2", className)} {...props}>
      <CountryMetaData
        country={countries[countryIndex]}
        data-testid="country-metadata"
      />

      {countries.length > 1 && (
        <span className="text-xs text-gray-500">
          although used in following countries
        </span>
      )}

      <div className="flex flex-wrap gap-2">
        {countries
          .filter((_, index) => index !== countryIndex)
          .map((country) => (
            <Flag
              isFlagProvided={country.isFlagProvided}
              countryCode={country.countryCode}
              className="h-4 self-start"
              key={country.countryCode}
              data-testid="secondary-flag"
            />
          ))}
      </div>
    </div>
  );
};
