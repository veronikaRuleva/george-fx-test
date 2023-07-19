import { CountryWithFlag } from "../app/ForeignExchange.types";

export interface IForeignExchangeResponse {
  baseCurrency: string;
  comparisonDate: string;
  fx: IForeignExchangeItem[];
  institute: number;
  lastUpdated: string;
}

export interface IForeignExchangeItem {
  currency: string;
  precision: number;
  banknoteRate?: IRate;
  exchangeRate?: IRate;
  flags?: string[];
  nameI18N?: string;
  countries?: CountryWithFlag[];
}

export interface IRate {
  buy: number;
  indicator: number;
  lastModified: string;
  middle: number;
  sell: number;
}
