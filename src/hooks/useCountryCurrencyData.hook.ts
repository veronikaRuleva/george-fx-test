import {
  addFlagAvailability,
  getCurrencyList,
} from "src/functions/countryUtils";
import useFetch from "./useFetch.hook";
import {
  CountryCode,
  CountryName,
  CurrencyCode,
} from "src/interfaces/app/ForeignExchange.types";
import { useMemo } from "react";

export const useCountryCurrencyData = () => {
  const {
    response: countryNames,
    isLoading: isCountryNamesLoading,
    isError: isCountryNamesError,
  } = useFetch<Record<CountryCode, CountryName>>(
    "https://run.mocky.io/v3/71baff6e-bb76-40f9-ad07-c98d4f85a261"
  );

  const {
    response: currencyCodes,
    isLoading: isCurrencyCodesLoading,
    isError: isCurrencyCodesError,
  } = useFetch<Record<CountryCode, CurrencyCode>>(
    "https://run.mocky.io/v3/6a922031-cef2-4b84-8340-ae19a96b1c42"
  );

  const {
    response: providedFlags,
    isLoading: isProvidedFlagsLoading,
    isError: isProvidedFlagsError,
  } = useFetch<CountryCode[]>("/provided-flags.json");

  const countryCurrencyCodesArray = useMemo(() => {
    if (countryNames && currencyCodes) {
      return getCurrencyList(countryNames, currencyCodes);
    }
  }, [countryNames, currencyCodes]);

  const currenciesList = useMemo(() => {
    if (countryCurrencyCodesArray && providedFlags) {
      return addFlagAvailability(countryCurrencyCodesArray, providedFlags);
    }
  }, [countryCurrencyCodesArray, providedFlags]);

  return {
    currenciesList: currenciesList,
    isLoading:
      isCountryNamesLoading || isCurrencyCodesLoading || isProvidedFlagsLoading,
    isError:
      isCountryNamesError || isCurrencyCodesError || isProvidedFlagsError,
  };
};
