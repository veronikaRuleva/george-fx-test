import { render, screen } from "@testing-library/react";
import { FlagProps, Flag } from "src/components/molecules/Flag.component";

describe("Flag component", () => {
  test("renders FlagImage when isFlagProvided is true", () => {
    const props: FlagProps = {
      isFlagProvided: true,
      countryCode: "US",
    };

    render(<Flag {...props} />);

    const flagImage = screen.getByTestId("flag");
    expect(flagImage).toBeInTheDocument();

    const flagPlaceholder = screen.queryByTestId("flag-placeholder");
    expect(flagPlaceholder).not.toBeInTheDocument();
  });

  test("renders FlagPlaceholder when isFlagProvided is false", () => {
    const props: FlagProps = {
      isFlagProvided: false,
      countryCode: "UK",
    };

    render(<Flag {...props} />);

    const flagImage = screen.queryByTestId("flag");
    expect(flagImage).not.toBeInTheDocument();

    const flagPlaceholder = screen.getByTestId("flag-placeholder");
    expect(flagPlaceholder).toBeInTheDocument();
  });

  test("forwards additional HTML attributes", () => {
    const props: FlagProps = {
      isFlagProvided: true,
      countryCode: "FR",
      "data-testid": "custom-flag",
    };

    render(<Flag {...props} />);

    const flagImage = screen.getByTestId("custom-flag");
    expect(flagImage).toBeInTheDocument();
  });
});
