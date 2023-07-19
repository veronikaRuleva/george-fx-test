import classNames from "classnames";
import { IForeignExchangeItem } from "src/interfaces/api/ForeignExchange.interface";
import { CurrencyExchangeRateCard } from "../molecules/CurrencyExchangeRateCard.component";

export interface CurrencyExchangeRateListProps
  extends React.HTMLAttributes<HTMLUListElement> {
  exchangeRates: IForeignExchangeItem[] | undefined;
  'data-testid'?: string;
}

export const CurrencyExchangeRateList = ({
  exchangeRates,
  className,
  ...props
}: CurrencyExchangeRateListProps) => {
  if (!exchangeRates) return null;

  return (
    <ul
      className={classNames(
        { grid: !className?.includes("grid") },
        { "gap-y-4": !className?.includes("gap") },
        className
      )}
      {...props}
    >
      {exchangeRates.map((el) => {
        return (
          <CurrencyExchangeRateCard
            as="li"
            key={el.currency}
            currencyCode={el.currency}
            countries={el.countries}
            currencyNameI18N={el.nameI18N}
            currencyMiddleExchangeRate={el.exchangeRate?.middle}
            precision={el.precision}
            data-testid="currency-exchange-rate-card"
          />
        );
      })}
    </ul>
  );
};
