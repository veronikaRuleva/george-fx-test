import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  appendCurrencyFlags,
  filterExchangeRates,
} from "src/functions/countryUtils";
import { IForeignExchangeResponse } from "../interfaces/api/ForeignExchange.interface";
import { useCountryCurrencyData } from "./useCountryCurrencyData.hook";
import useFetch from "./useFetch.hook";

export const useExchangeRates = () => {
  const { currenciesList } = useCountryCurrencyData();
  let [searchParams, _] = useSearchParams();
  const query = searchParams.get("s");

  const {
    response: fxResponse,
    isLoading: isFxLoading,
    isError: isFxError,
  } = useFetch<IForeignExchangeResponse>(
    "https://run.mocky.io/v3/c88db14a-3128-4fbd-af74-1371c5bb0343"
  );

  const validExchangeRates = useMemo(() => {
    if (fxResponse) {
      return fxResponse?.fx.filter((el) => el.exchangeRate !== undefined);
    }
  }, [fxResponse]);

  const fullExchangeRatesList = useMemo(() => {
    if (currenciesList && validExchangeRates) {
      return appendCurrencyFlags(currenciesList, validExchangeRates);
    }
  }, [currenciesList, validExchangeRates]);

  const filteredExchangeRates = useMemo(() => {
    if (fullExchangeRatesList) {
      if (query) {
        return filterExchangeRates(fullExchangeRatesList, query);
      } else {
        return fullExchangeRatesList;
      }
    }
  }, [fullExchangeRatesList, query]);

  return {
    isLoading: isFxLoading,
    isError: isFxError,
    exchangeRates: filteredExchangeRates,
  };
};
