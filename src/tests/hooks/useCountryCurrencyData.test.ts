import { renderHook } from "@testing-library/react";
import { useCountryCurrencyData } from "src/hooks/useCountryCurrencyData.hook";
import useFetch from "src/hooks/useFetch.hook";

jest.mock("src/hooks/useFetch.hook");

describe("useCountryCurrencyData", () => {
  test("returns the expected data", async () => {
    const mockCountryNames = {
      US: "United States",
      DE: "Germany",
    };

    const mockCurrencyCodes = {
      US: "USD",
      DE: "EUR",
    };

    const mockProvidedFlags = ["us", "de"];

    // Mock the useFetch hook to return the expected data
    (useFetch as jest.Mock).mockImplementation((url: string) => {
      if (
        url === "https://run.mocky.io/v3/71baff6e-bb76-40f9-ad07-c98d4f85a261"
      ) {
        return {
          response: mockCountryNames,
          isLoading: false,
          isError: false,
        };
      }
      if (
        url === "https://run.mocky.io/v3/6a922031-cef2-4b84-8340-ae19a96b1c42"
      ) {
        return {
          response: mockCurrencyCodes,
          isLoading: false,
          isError: false,
        };
      }
      if (url === "/provided-flags.json") {
        return {
          response: mockProvidedFlags,
          isLoading: false,
          isError: false,
        };
      }
      return {
        response: null,
        isLoading: false,
        isError: false,
      };
    });

    const { result } = renderHook(() => useCountryCurrencyData());

    expect(result.current.currenciesList).toEqual([
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
    ]);

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });
});
