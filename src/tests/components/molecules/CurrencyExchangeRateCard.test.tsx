import { render, screen } from "@testing-library/react";
import {
  CurrencyExchangeRateCard,
  CurrencyExchangeRateCardProps,
} from "src/components/molecules/CurrencyExchangeRateCard.component";

describe("CurrencyExchangeRateCard component", () => {
  test("renders correctly with currency name and exchange rate", () => {
    const countries = [
      { countryCode: "US", countryName: "United States", isFlagProvided: true },
      {
        countryCode: "UK",
        countryName: "United Kingdom",
        isFlagProvided: false,
      },
    ];

    const props: CurrencyExchangeRateCardProps<"div"> = {
      countries,
      currencyNameI18N: "US Dollar",
      currencyCode: "USD",
      currencyMiddleExchangeRate: 1.23,
      precision: 2,
    };

    render(<CurrencyExchangeRateCard {...props} />);

    const cardElement = screen.getByTestId("card");
    expect(cardElement).toBeInTheDocument();

    const currencyMetaDataElement = screen.getByTestId("currency-metadata");
    expect(currencyMetaDataElement).toBeInTheDocument();
    expect(currencyMetaDataElement).toHaveClass("flex-1");

    const currencyNameElement = screen.getByText("US Dollar");
    expect(currencyNameElement).toBeInTheDocument();

    const exchangeRateElement = screen.getByText("1 EUR = 1.23 USD");
    expect(exchangeRateElement).toBeInTheDocument();
  });

  test("renders null when countries prop is not provided", () => {
    const props: CurrencyExchangeRateCardProps<"div"> = {
      currencyNameI18N: "US Dollar",
      currencyCode: "USD",
      currencyMiddleExchangeRate: 1.23,
      precision: 2,
    };

    render(<CurrencyExchangeRateCard {...props} />);

    const cardElement = screen.queryByRole("div");
    expect(cardElement).toBeNull();
  });

  test("renders with custom HTML element", () => {
    const countries = [
      { countryCode: "FR", countryName: "France", isFlagProvided: true },
    ];

    const props: CurrencyExchangeRateCardProps<"section"> = {
      countries,
      currencyNameI18N: "Euro",
      currencyCode: "EUR",
      currencyMiddleExchangeRate: 0.88,
      precision: 2,
      as: "section",
    };

    render(<CurrencyExchangeRateCard {...props} />);

    const cardElement = screen.getByTestId("card");
    expect(cardElement).toBeInTheDocument();
    expect(cardElement.tagName).toBe("SECTION");
  });
});
