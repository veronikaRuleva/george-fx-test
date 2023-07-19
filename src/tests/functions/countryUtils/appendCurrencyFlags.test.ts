import { appendCurrencyFlags } from "src/functions/countryUtils";

describe("appendCurrencyFlags", () => {
  test("appends flags to exchange rates", () => {
    const currencyListWithFlag = [
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
    ];

    const exchangeRates = [
      {
        currency: "USD",
        nameI18N: "US Dollar",
        precision: 2,
      },
    ];

    const result = appendCurrencyFlags(currencyListWithFlag, exchangeRates);

    expect(result).toHaveLength(1);
    expect(result[0].flags).toEqual(["provided"]);
    expect(result[0].countries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          countryCode: "US",
          countryName: "United States",
        }),
      ])
    );
  });
});
