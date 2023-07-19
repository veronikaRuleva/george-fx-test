import { filterExchangeRates } from "src/functions/countryUtils";

describe("filterExchangeRates", () => {
  const exchangeRates = [
    {
      currency: "USD",
      nameI18N: "US Dollar",
      precision: 2,
      countries: [
        {
          countryCode: "US",
          isFlagProvided: true,
          countryName: "United States",
        },
        { countryCode: "CA", isFlagProvided: true, countryName: "Canada" },
      ],
    },
    {
      currency: "EUR",
      nameI18N: "Euro",
      precision: 2,
      countries: [
        { countryCode: "DE", isFlagProvided: true, countryName: "Germany" },
        { countryCode: "FR", isFlagProvided: true, countryName: "France" },
      ],
    },
  ];

  test("filters exchange rates by search query", () => {
    const query = "us";

    const result = filterExchangeRates(exchangeRates, query);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(
      expect.objectContaining({
        currency: "USD",
        nameI18N: "US Dollar",
      })
    );
  });

  test("returns all exchange rates if no match found", () => {
    const query = "xyz";

    const result = filterExchangeRates(exchangeRates, query);

    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });
});
