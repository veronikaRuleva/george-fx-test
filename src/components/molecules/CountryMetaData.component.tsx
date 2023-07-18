import { HTMLAttributes } from "react";
import { FlagImage } from "../atoms/FlagImage.component";
import classNames from "classnames";
import { CountryWithFlag } from "src/interfaces/app/ForeignExchange.interface";
import { Badge } from "../atoms/Badje.component";
import { FlagPlaceholder } from "../atoms/FlagPlaceholde.component";

export interface CurrencyMetaDataProps extends HTMLAttributes<HTMLDivElement> {
  country: CountryWithFlag;
}

export const CountryMetaData = ({
  className,
  country,
}: CurrencyMetaDataProps) => {
  const { countryCode, countryName, isFlagProvided } = country;
  return (
    <div className={classNames("flex gap-x-2", className)}>
      {isFlagProvided ? (
        <FlagImage
          pathToFlagImages="/images/flags/"
          alt={countryCode}
          countryCode={countryCode}
          imageFileType="png"
          className="h-6"
        />
      ) : (
        <FlagPlaceholder countryCode={countryCode} />
      )}
      <span className="flex">{countryName}</span>
    </div>
  );
};
