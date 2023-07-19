import { getCurrencyList } from "src/functions/countryUtils";

describe('getCurrencyList', () => {
  test('returns currency list with countries', () => {
    const countries = {
      US: 'United States',
      CA: 'Canada',
    };

    const currencyCodes = {
      US: 'USD',
      CA: 'CAD',
    };

    const result = getCurrencyList(countries, currencyCodes);

    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          currencyCode: 'USD',
          countries: [
            { countryCode: 'US', countryName: 'United States' },
          ],
        }),
        expect.objectContaining({
          currencyCode: 'CAD',
          countries: [
            { countryCode: 'CA', countryName: 'Canada' },
          ],
        }),
      ])
    );
  });

  test('ignores countries without currency codes', () => {
    const countries = {
      US: 'United States',
      FR: 'France',
    };

    const currencyCodes = {
      US: 'USD',
    };

    const result = getCurrencyList(countries, currencyCodes);

    expect(result).toHaveLength(1);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          currencyCode: 'USD',
          countries: [
            { countryCode: 'US', countryName: 'United States' },
          ],
        }),
      ])
    );
  });
});
