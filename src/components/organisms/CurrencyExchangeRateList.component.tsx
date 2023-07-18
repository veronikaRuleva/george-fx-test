import classNames from "classnames";
import { CurrencyExchangeRateCard } from "../molecules/CurrencyExchangeRateCard. component";
import { IForeignExchangeItem } from "src/interfaces/api/ForeingExchange.interface";
import { findIndexByCurrencyCode } from "src/functions/countryUtils";

export interface CurrencyExchangeRateListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  exchangeRates: IForeignExchangeItem[] | undefined;
}

export const CurrencyExchangeRateList = ({
  exchangeRates,
  className,
}: CurrencyExchangeRateListProps) => {
  if (!exchangeRates) return null;

  return (
    <ul
      className={classNames(
        { grid: !className?.includes("grid") },
        { "gap-y-4": !className?.includes("gap") },
        className
      )}
    >
      {exchangeRates.map((el) => {
        return (
          <CurrencyExchangeRateCard
            as="li"
            key={el.currency}
            currencyCode={el.currency}
            country={
              el.countries &&
              el.countries[findIndexByCurrencyCode(el.countries, el.currency)]
            }
            isUsedInMultipleCountries={
              el.countries && el.countries.length > 1 ? true : false
            }
            currencyNameI18N={el.nameI18N}
            currencyMiddleExchangeRate={el.exchangeRate?.middle}
            precision={el.precision}
          />
        );
      })}
    </ul>
  );
};
