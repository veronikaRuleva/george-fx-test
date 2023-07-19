import { findIndexByCurrencyCode } from "src/functions/countryUtils";

describe("findIndexByCurrencyCode", () => {
  test("finds index of currency code with matching prefix and flag provided", () => {
    const countries = [
      { countryCode: "US", isFlagProvided: true, countryName: "United States" },
      { countryCode: "CA", isFlagProvided: true, countryName: "Canada" },
    ];

    const result = findIndexByCurrencyCode(countries, "CAD");

    expect(result).toBe(1);
  });

  test("finds index of flag provided currency code without matching prefix", () => {
    const countries = [
      { countryCode: "US", isFlagProvided: true, countryName: "United States" },
      { countryCode: "DE", isFlagProvided: true, countryName: "Germany" },
    ];

    const result = findIndexByCurrencyCode(countries, "CAD");

    expect(result).toBe(0);
  });

  test("returns 0 if no flag provided currency code found", () => {
    const countries = [
      {
        countryCode: "US",
        isFlagProvided: false,
        countryName: "United States",
      },
      { countryCode: "DE", isFlagProvided: false, countryName: "Germany" },
    ];

    const result = findIndexByCurrencyCode(countries, "CAD");

    expect(result).toBe(0);
  });
});
