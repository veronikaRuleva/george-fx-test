import { IForeignExchangeItem } from "src/interfaces/api/ForeingExchange.interface";
import {
  CurrencyCode,
  CountryCode,
  CountryName,
  CurrencyObject,
  CurrencyObjectWithFlag,
  CountryWithFlag,
} from "src/interfaces/app/ForeignExchange.interface";

export const findIsFlagProvided = (
  providedFlags: string[],
  countryCode: string
) => {
  if (providedFlags.includes(countryCode.toLocaleLowerCase())) {
    return true;
  }

  return false;
};

export function getCurrencyList(
  countries: Record<CountryCode, CountryName>,
  currencyCodes: Record<CountryCode, CurrencyCode>
): CurrencyObject[] {
  const currencyList: Record<CurrencyCode, CurrencyObject> = {};

  for (const countryCode in countries) {
    const countryName = countries[countryCode];
    const currencyCode = currencyCodes[countryCode];

    if (currencyCode) {
      if (!currencyList[currencyCode]) {
        currencyList[currencyCode] = {
          currencyCode,
          countries: [],
        };
      }

      currencyList[currencyCode].countries.push({
        countryCode,
        countryName,
      });
    }
  }

  return Object.values(currencyList);
}

export function addFlagAvailability(
  currencyList: CurrencyObject[],
  availableFlags: CountryCode[]
): CurrencyObjectWithFlag[] {
  return currencyList.map((currency) => {
    const countriesWithFlag: CountryWithFlag[] = currency.countries.map(
      (country) => ({
        ...country,
        isFlagProvided: availableFlags.includes(
          country.countryCode.toLocaleLowerCase()
        ),
      })
    );

    return {
      currencyCode: currency.currencyCode,
      countries: countriesWithFlag,
    };
  });
}

export function appendCurrencyFlags(
  currencyListWithFlag: CurrencyObjectWithFlag[],
  exchangeRates: IForeignExchangeItem[]
): IForeignExchangeItem[] {
  return exchangeRates.map((rate) => {
    const currencyObject = currencyListWithFlag.find(
      (currency) => currency.currencyCode === rate.currency
    );

    if (currencyObject) {
      return {
        ...rate,
        countries: currencyObject.countries,
        flags: currencyObject.countries.map((country) =>
          country.isFlagProvided ? "provided" : ""
        ),
      };
    }

    return rate;
  });
}

export function findIndexByCurrencyCode(
  countries: CountryWithFlag[],
  currencyCode: string
): number {
  const countryCodePrefix = currencyCode.substring(0, 2);

  // console.log(countries, currencyCode);
  for (let i = 0; i < countries.length; i++) {
    const { countryCode, isFlagProvided } = countries[i];
    if (countryCode.startsWith(countryCodePrefix) && isFlagProvided) {
      return i;
    }
  }

  const flagProvidedIndex = countries.findIndex(
    (country) => country.isFlagProvided
  );

  if (flagProvidedIndex !== -1) {
    return flagProvidedIndex;
  }

  return 0;
}
