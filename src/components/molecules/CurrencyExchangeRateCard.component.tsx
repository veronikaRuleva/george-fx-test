import { CountryWithFlag } from "src/interfaces/app/ForeignExchange.types";
import { Card } from "../atoms/Card.component";
import { CurrencyMetaData } from "./CurrencyMetaData.component";
import { ElementType, memo } from "react";

export interface CurrencyExchangeRateCardProps<C extends ElementType>
  extends React.HTMLAttributes<HTMLDivElement> {
  currencyCode: string;
  currencyNameI18N?: string;
  currencyMiddleExchangeRate?: number;
  precision?: number;
  as?: C;
  countries?: CountryWithFlag[];
}

export const CurrencyExchangeRateCard = memo(
  function CurrencyExchangeRateCardComponent<C extends ElementType>({
    countries,
    currencyNameI18N,
    currencyCode,
    currencyMiddleExchangeRate,
    precision,
    as,
    ...props
  }: CurrencyExchangeRateCardProps<C>) {
    if (!countries) return null;

    return (
      <Card
        className="flex justify-between items-center"
        as={as}
        data-testid="card"
        {...props}
      >
        <CurrencyMetaData
          countries={countries}
          currencyCode={currencyCode}
          className="flex-1"
          data-testid="currency-metadata"
        />
        <div className="flex flex-col flex-1">
          <span className="font-semibold text-gray-500 flex self-end">
            {currencyNameI18N}
          </span>

          {currencyMiddleExchangeRate && (
            <span className="self-end">{`1 EUR = ${currencyMiddleExchangeRate.toFixed(
              precision
            )} ${currencyCode}`}</span>
          )}
        </div>
      </Card>
    );
  }
);
