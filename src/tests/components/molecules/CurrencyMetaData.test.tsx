import { render, screen } from '@testing-library/react';
import { CountryWithFlag, CurrencyCode } from 'src/interfaces/app/ForeignExchange.types';
import { findIndexByCurrencyCode } from 'src/functions/countryUtils';
import { CurrencyMetaData, CurrencyMetaDataProps } from 'src/components/molecules/CurrencyMetaData.component';

jest.mock('src/functions/countryUtils', () => ({
  findIndexByCurrencyCode: jest.fn(),
}));

describe('CurrencyMetaData component', () => {
  const mockedFindIndexByCurrencyCode = findIndexByCurrencyCode as jest.MockedFunction<
    typeof findIndexByCurrencyCode
  >;

  test('renders correctly with country information', () => {
    const countries: CountryWithFlag[] = [
      {
        countryCode: 'US',
        countryName: 'United States',
        isFlagProvided: true,
      },
      {
        countryCode: 'UK',
        countryName: 'United Kingdom',
        isFlagProvided: false,
      },
    ];

    const props: CurrencyMetaDataProps = {
      countries,
      currencyCode: 'USD',
      'data-testid': "currency-metadata"
    };

    mockedFindIndexByCurrencyCode.mockReturnValue(0);

    render(<CurrencyMetaData {...props} />);
    const metaDataElement = screen.getByTestId('currency-metadata');

    expect(metaDataElement).toBeInTheDocument();
    expect(metaDataElement).toHaveClass('flex');
    expect(metaDataElement).toHaveClass('flex-col');
    expect(metaDataElement).toHaveClass('gap-y-2');

    const countryMetaDataComponent = screen.getByTestId('country-metadata');
    expect(countryMetaDataComponent).toBeInTheDocument();

    const countryNameElement = screen.getByText('although used in following countries');
    expect(countryNameElement).toBeInTheDocument();

    const mainFlagComponents = screen.getAllByTestId('flag');
    expect(mainFlagComponents).toHaveLength(1);
    expect(mainFlagComponents[0]).toHaveClass('h-6');

    const flagComponents = screen.getAllByTestId('secondary-flag');
    expect(flagComponents[0]).toHaveClass('h-4');
    expect(flagComponents[0]).toHaveClass('self-start');
  });

  test('renders null when countries prop is not provided', () => {
    const props: CurrencyMetaDataProps = {
      currencyCode: 'USD',
      countries: []
    };

    render(<CurrencyMetaData {...props} />);

    const metaDataElement = screen.queryByTestId('country-metadata');
    expect(metaDataElement).toBeNull();
  });

//   test('renders null when countryIndex is not found', () => {
//     const countries: CountryWithFlag[] = [
//       {
//         countryCode: 'US',
//         countryName: 'United States',
//         isFlagProvided: true,
//       },
//     ];

//     const props: CurrencyMetaDataProps = {
//       countries,
//       currencyCode: 'UK',
//     };

//     mockedFindIndexByCurrencyCode.mockReturnValue(-1);

//     render(<CurrencyMetaData {...props} />);

//     const metaDataElement = screen.queryByTestId('country-metadata');
//     expect(metaDataElement).toBeNull();
//   });
});
