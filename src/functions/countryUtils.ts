import { IForeignExchangeItem } from "src/interfaces/api/ForeignExchange.interface";
import {
  CurrencyCode,
  CountryCode,
  CountryName,
  CurrencyObject,
  CurrencyObjectWithFlag,
  CountryWithFlag,
} from "src/interfaces/app/ForeignExchange.types";

export const getCurrencyList = (
  countries: Record<CountryCode, CountryName>,
  currencyCodes: Record<CountryCode, CurrencyCode>
): CurrencyObject[] => {
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
};

export const addFlagAvailability = (
  currencyList: CurrencyObject[],
  availableFlags: CountryCode[]
): CurrencyObjectWithFlag[] => {
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
};

export const appendCurrencyFlags = (
  currencyListWithFlag: CurrencyObjectWithFlag[],
  exchangeRates: IForeignExchangeItem[]
): IForeignExchangeItem[] => {
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
};

export const findIndexByCurrencyCode = (
  countries: CountryWithFlag[],
  currencyCode: string
): number => {
  const countryCodePrefix = currencyCode.substring(0, 2);

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
};

export const filterExchangeRates = (
  exchangeRates: IForeignExchangeItem[],
  query: string
): IForeignExchangeItem[] => {
  const searchQuery = query.toLowerCase().trim();

  return exchangeRates.filter((rate) => {
    // Check if the country name, country code, currency code, or currency name contains the search query
    const matchesCountryName = rate.countries?.some((country) =>
      country.countryName.toLowerCase().includes(searchQuery)
    );

    const matchesCountryCode = rate.countries?.some((country) =>
      country.countryCode.toLowerCase().includes(searchQuery)
    );

    const matchesCurrencyCode = rate.currency
      .toLowerCase()
      .includes(searchQuery);

    const matchesCurrencyName = rate.nameI18N
      ?.toLowerCase()
      .includes(searchQuery);

    return (
      matchesCountryName ||
      matchesCountryCode ||
      matchesCurrencyCode ||
      matchesCurrencyName
    );
  });
};
