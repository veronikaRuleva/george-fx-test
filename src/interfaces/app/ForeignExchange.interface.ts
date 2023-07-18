export type CurrencyCode = string;
export type CountryCode = string;
export type CountryName = string;

export type CurrencyObject = {
  currencyCode: CurrencyCode;
  countries: {
    countryCode: CountryCode;
    countryName: CountryName;
  }[];
};

export type CountryWithFlag = {
  countryCode: CountryCode;
  countryName: CountryName;
  isFlagProvided: boolean;
};

export type CurrencyObjectWithFlag = {
  currencyCode: CurrencyCode;
  countries: CountryWithFlag[];
};
