import { addFlagAvailability } from "src/functions/countryUtils";

describe('addFlagAvailability', () => {
  test('adds flag availability to currency list', () => {
    const currencyList = [
      {
        currencyCode: 'USD',
        countries: [
          { countryCode: 'US', countryName: 'United States' },
          { countryCode: 'CA', countryName: 'Canada' },
        ],
      },
    ];

    const availableFlags = ['us'];

    const result = addFlagAvailability(currencyList, availableFlags);

    expect(result).toHaveLength(1);
    expect(result[0].countries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          countryCode: 'US',
          countryName: 'United States',
          isFlagProvided: true,
        }),
        expect.objectContaining({
          countryCode: 'CA',
          countryName: 'Canada',
          isFlagProvided: false,
        }),
      ])
    );
  });
});
