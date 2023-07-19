import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "src/App";
import { useExchangeRates } from "src/hooks/useExchangeRates.hook";

jest.mock("src/hooks/useExchangeRates.hook");

describe("App component", () => {
  test("renders loading message when data is loading", () => {
    (useExchangeRates as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
      exchangeRates: null,
    });

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const loadingMessage = screen.getByText("Loading...");
    expect(loadingMessage).toBeInTheDocument();
  });

  test("renders error message when data fetch has failed", () => {
    (useExchangeRates as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      exchangeRates: null,
    });

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const errorMessage = screen.getByText("Error occurred");
    expect(errorMessage).toBeInTheDocument();
  });

  test("renders CurrencyExchangeRateList when data is loaded", () => {
    const mockExchangeRates = [
      {
        currency: "USD",
        nameI18N: "US Dollar",
        countries: [
          { countryCode: "US", countryName: "United States" },
          { countryCode: "CA", countryName: "Canada" },
        ],
      },
      {
        currency: "EUR",
        nameI18N: "Euro",
        countries: [
          { countryCode: "DE", countryName: "Germany" },
          { countryCode: "FR", countryName: "France" },
        ],
      },
    ];

    (useExchangeRates as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      exchangeRates: mockExchangeRates,
    });

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const headerElement = screen.getByRole("banner");
    expect(headerElement).toBeInTheDocument();

    const searchInput = screen.getByRole("textbox", {
      name: "Search currencies",
    });
    expect(searchInput).toBeInTheDocument();

    const currencyExchangeRateList = screen.getByTestId(
      "currency-exchange-rate-list"
    );
    expect(currencyExchangeRateList).toBeInTheDocument();
  });
});
