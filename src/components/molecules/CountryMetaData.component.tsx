import classNames from "classnames";
import { HTMLAttributes } from "react";
import { CountryWithFlag } from "src/interfaces/app/ForeignExchange.types";
import { Flag } from "./Flag.component";

export interface CountryMetaDataProps extends HTMLAttributes<HTMLDivElement> {
  country: CountryWithFlag;
}

export const CountryMetaData = ({
  className,
  country,
  ...props
}: CountryMetaDataProps) => {
  const { countryCode, countryName, isFlagProvided } = country;
  return (
    <div className={classNames("flex gap-x-2", className)} {...props}>
      <Flag
        isFlagProvided={isFlagProvided}
        countryCode={countryCode}
        className="h-6"
      />
      <span className="flex">{countryName}</span>
    </div>
  );
};
