import { useSearchParams as mockUseSearchParams } from "react-router-dom";
import { useExchangeRates } from "src/hooks/useExchangeRates.hook";
import {
  IForeignExchangeItem,
  IForeignExchangeResponse,
} from "src/interfaces/api/ForeignExchange.interface";
import { useCountryCurrencyData } from "src/hooks/useCountryCurrencyData.hook";
import useFetch from "src/hooks/useFetch.hook";
import { renderHook } from "@testing-library/react";

jest.mock("react-router-dom", () => ({
  useSearchParams: jest.fn(),
}));

jest.mock("src/hooks/useCountryCurrencyData.hook", () => ({
  useCountryCurrencyData: jest.fn(),
}));

jest.mock("src/hooks/useFetch.hook", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedUseCountryCurrencyData =
  useCountryCurrencyData as jest.MockedFunction<typeof useCountryCurrencyData>;

const mockedUseFetch = useFetch as jest.MockedFunction<typeof useFetch>;

describe("useExchangeRates", () => {
  test("useExchangeRates returns the correct data", () => {
    const exchangeRatesData: IForeignExchangeResponse = {
      fx: [
        {
          currency: "USD",
          nameI18N: "US Dollar",
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
          exchangeRate: {
            middle: 0.88,
            buy: 0,
            indicator: 0,
            lastModified: "08-09-1997",
            sell: 0,
          },
          precision: 2,
        },
      ],
      baseCurrency: "",
      comparisonDate: "",
      institute: 0,
      lastUpdated: "",
    };

    const mockedCurrenciesList = [
      {
        currencyCode: "USD",
        countries: [
          {
            countryCode: "US",
            countryName: "United States",
            isFlagProvided: true,
          },
        ],
      },
      {
        currencyCode: "EUR",
        countries: [
          { countryCode: "DE", countryName: "Germany", isFlagProvided: true },
        ],
      },
    ];

    const mockedFilteredExchangeRates: IForeignExchangeItem[] = [
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
        flags: ["provided"],
        exchangeRate: {
          middle: 1.23,
          buy: 0,
          indicator: 0,
          lastModified: "08-09-1997",
          sell: 0,
        },
        precision: 2,
      },
    ];

    const mockQuery = "usd";
    (mockUseSearchParams as jest.Mock).mockReturnValue([
      { get: () => mockQuery, set: jest.fn() },
    ]);

    mockedUseCountryCurrencyData.mockReturnValue({
      currenciesList: mockedCurrenciesList,
      isLoading: false,
      isError: false,
    });

    mockedUseFetch.mockReturnValue({
      response: exchangeRatesData,
      isLoading: false,
      isError: false,
    });

    const { result } = renderHook(() => useExchangeRates());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.exchangeRates).toEqual(mockedFilteredExchangeRates);
  });
});
