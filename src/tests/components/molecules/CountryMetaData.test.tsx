import { render, screen } from "@testing-library/react";
import {
  CountryMetaData,
  CountryMetaDataProps,
} from "src/components/molecules/CountryMetaData.component";

describe("CountryMetaData component", () => {
  test("renders with correct country name and flag", () => {
    const country = {
      countryCode: "US",
      countryName: "United States",
      isFlagProvided: true,
    };

    const props: CountryMetaDataProps = {
      country,
    };

    render(<CountryMetaData {...props} />);

    const flagElement = screen.getByTestId("flag");
    expect(flagElement).toBeInTheDocument();
    expect(flagElement).toHaveAttribute(
      "src",
      `/images/flags/${country.countryCode.toLowerCase()}.png`
    );
    expect(flagElement).toHaveClass("h-6");

    const countryNameElement = screen.getByText("United States");
    expect(countryNameElement).toBeInTheDocument();
  });

  test("renders without flag when isFlagProvided is false", () => {
    const country = {
      countryCode: "UK",
      countryName: "United Kingdom",
      isFlagProvided: false,
    };

    const props: CountryMetaDataProps = {
      country,
    };

    render(<CountryMetaData {...props} />);

    const flagElement = screen.queryByTestId("flag");
    expect(flagElement).not.toBeInTheDocument();

    const flagPlaceholderElement = screen.queryByTestId("flag-placeholder");
    expect(flagPlaceholderElement).toBeInTheDocument();

    const countryNameElement = screen.getByText("United Kingdom");
    expect(countryNameElement).toBeInTheDocument();
  });

  test("renders with additional CSS classes", () => {
    const country = {
      countryCode: "FR",
      countryName: "France",
      isFlagProvided: true,
    };

    const props: CountryMetaDataProps = {
      country,
      className: "extra-class",
    };

    render(<CountryMetaData data-testid="country-metadata" {...props} />);

    const containerElement = screen.getByTestId("country-metadata");
    expect(containerElement).toHaveClass("extra-class");
  });
});
