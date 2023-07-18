import {
  IForeignExchangeItem,
  IForeignExchangeResponse,
} from "../interfaces/api/ForeingExchange.interface";
import useFetch from "./useFetch.hook";
import { useCountryCurrencyData } from "./useCountryCurrencyData.hook";
import { appendCurrencyFlags } from "src/functions/countryUtils";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useExchangeRates = () => {
  let [searchParams, _] = useSearchParams();
  const query = searchParams.get("s");

  const {
    response: fxResponse,
    isLoading: isFxLoading,
    isError: isFxError,
  } = useFetch<IForeignExchangeResponse>(
    "https://run.mocky.io/v3/c88db14a-3128-4fbd-af74-1371c5bb0343"
  );

  const { currenciesList } = useCountryCurrencyData();

  const filteredExchangeRates = useMemo(() => {
    if (fxResponse) {
      return fxResponse?.fx.filter((el) => el.exchangeRate !== undefined);
    }
  }, [fxResponse]);

  const fullExchangeRatesList = useMemo(() => {
    if (currenciesList && filteredExchangeRates) {
      return appendCurrencyFlags(currenciesList, filteredExchangeRates);
    }
  }, [currenciesList, filteredExchangeRates]);

  const rates = useMemo(() => {
    if (fullExchangeRatesList) {
      if (query) {
        return filterExchangeRates(fullExchangeRatesList, query);
      } else {
        return fullExchangeRatesList;
      }
    }
  }, [fullExchangeRatesList, query]);

  function filterExchangeRates(
    exchangeRates: IForeignExchangeItem[],
    query: string
  ): IForeignExchangeItem[] {
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
  }
  return {
    isLoading: isFxLoading,
    isError: isFxError,
    exchangeRates: rates,
  };
};
