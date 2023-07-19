import { render, screen } from "@testing-library/react";
import {
  CurrencyExchangeRateCard,
  CurrencyExchangeRateCardProps,
} from "src/components/molecules/CurrencyExchangeRateCard.component";
import {
  CurrencyExchangeRateList,
  CurrencyExchangeRateListProps,
} from "src/components/organisms/CurrencyExchangeRateList.component";
import { IForeignExchangeItem } from "src/interfaces/api/ForeignExchange.interface";

// jest.mock(
//   "src/components/molecules/CurrencyExchangeRateCard.component",
//   () => ({
//     CurrencyExchangeRateCard: jest.fn((props) => {
//       return <div data-testid="mock-currency-exchange-rate-card" />;
//     }),
//   })
// );

// jest.mock("src/components/molecules/CurrencyExchangeRateCard.component", () => () => {
//     return <div data-testid="mock-currency-exchange-rate-card" />;
//   });
// const mockChildComponent = jest.fn();

// jest.mock("src/components/molecules/CurrencyExchangeRateCard.component", () => ({
//     CurrencyExchangeRateCard: ({...props}: CurrencyExchangeRateCardProps<C>) => {
//         mockChildComponent(props);
//        return <div data-testid="mock-currency-exchange-rate-card" />;
//     },
//   }));

// jest.mock(
//   "src/components/molecules/CurrencyExchangeRateCard.component",
//   () => ({
//     CurrencyExchangeRateCard: jest.fn((props) => {
//       console.log(props);
//       return <div data-testid="mock-currency-exchange-rate-card" />;
//     }),
//   })
// );

describe("CurrencyExchangeRateList component", () => {
  test("renders correctly with exchange rates", () => {
    const exchangeRates: IForeignExchangeItem[] = [
      {
        currency: "USD",
        nameI18N: "US Dollar",
        countries: [
          {
            countryCode: "US",
            countryName: "United States",
            isFlagProvided: true,
          },
        ],
        exchangeRate: {
          middle: 1.23,
          buy: 0,
          indicator: 0,
          lastModified: "08-09-1997",
          sell: 0,
        },
        precision: 2,
      },
      {
        currency: "EUR",
        nameI18N: "Euro",
        countries: [
          { countryCode: "DE", countryName: "Germany", isFlagProvided: true },
        ],
        exchangeRate: {
          middle: 0.88,
          buy: 0,
          indicator: 0,
          lastModified: "08-09-1997",
          sell: 0,
        },
        precision: 2,
      },
    ];

    const props: CurrencyExchangeRateListProps = {
      exchangeRates,
      "data-testid": "currency-exchange-rate-list",
    };

    render(<CurrencyExchangeRateList {...props} />);

    const currencyExchangeRateList = screen.getByTestId(
      "currency-exchange-rate-list"
    );
    expect(currencyExchangeRateList).toBeInTheDocument();

    const currencyExchangeRateCardComponents = screen.getAllByTestId(
      "currency-exchange-rate-card"
    );
    expect(currencyExchangeRateCardComponents).toHaveLength(
      exchangeRates.length
    );
  });

  test("renders null when exchangeRates prop is not provided", () => {
    const props: CurrencyExchangeRateListProps = {
      "data-testid": "currency-exchange-rate-list",
      exchangeRates: undefined,
    };

    render(<CurrencyExchangeRateList {...props} />);

    const currencyExchangeRateList = screen.queryByTestId(
      "currency-exchange-rate-list"
    );
    expect(currencyExchangeRateList).toBeNull();
  });
});
