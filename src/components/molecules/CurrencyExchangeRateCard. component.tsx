import { CountryWithFlag } from "src/interfaces/app/ForeignExchange.interface";
import { Card } from "../atoms/Card.component";
import { CurrencyMetaData } from "./CurrencyMetaData.component";
import { ElementType } from "react";

export interface CurrencyExchangeRateCardProps<C extends ElementType>
  extends React.HTMLAttributes<HTMLDivElement> {
  currencyCode: string;
  isUsedInMultipleCountries: boolean;
  country?: CountryWithFlag;
  currencyNameI18N?: string;
  currencyMiddleExchangeRate?: number;
  precision?: number;
  as?: C;
}

export const CurrencyExchangeRateCard = <C extends ElementType>({
  country,
  currencyNameI18N,
  currencyCode,
  currencyMiddleExchangeRate,
  precision,
  isUsedInMultipleCountries,
  as,
}: CurrencyExchangeRateCardProps<C>) => {
  if (!country) return null;

  return (
    <Card className="flex justify-between items-center" as={as}>
      <CurrencyMetaData
        isUsedInMultipleCountries={isUsedInMultipleCountries}
        country={country}
      />
      <div className="flex flex-col">
        <span className="font-semibold text-gray-500 flex self-end">
          {currencyNameI18N}
        </span>
        {currencyMiddleExchangeRate && (
          <span>{`1 EUR = ${currencyMiddleExchangeRate.toFixed(
            precision
          )} ${currencyCode}`}</span>
        )}
      </div>
    </Card>
  );
};
