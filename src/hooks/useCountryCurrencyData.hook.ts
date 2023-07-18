import {
  addFlagAvailability,
  getCurrencyList,
} from "src/functions/countryUtils";
import useFetch from "./useFetch.hook";
import {
  CountryCode,
  CountryName,
  CurrencyCode,
} from "src/interfaces/app/ForeignExchange.interface";

export const useCountryCurrencyData = () => {
  const { response: countryNames } = useFetch<Record<CountryCode, CountryName>>(
    "https://run.mocky.io/v3/71baff6e-bb76-40f9-ad07-c98d4f85a261"
  );

  const { response: currencyCodes } = useFetch<
    Record<CountryCode, CurrencyCode>
  >("https://run.mocky.io/v3/6a922031-cef2-4b84-8340-ae19a96b1c42");

  const { response: providedFlags } = useFetch<CountryCode[]>(
    "/provided-flags.json"
  );

  let countryCurrencyCodesArray;
  let currenciesList;

  if (countryNames && currencyCodes) {
    countryCurrencyCodesArray = getCurrencyList(countryNames, currencyCodes);
  }

  if (countryCurrencyCodesArray && providedFlags) {
    currenciesList = addFlagAvailability(
      countryCurrencyCodesArray,
      providedFlags
    );
  }

  return {
    currenciesList: currenciesList,
    // isCountryNamesLoading: isLoading,
    // isCountryNamesError: isError,
  };
};
