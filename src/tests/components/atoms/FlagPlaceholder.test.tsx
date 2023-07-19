import { render, screen } from "@testing-library/react";
import {
  FlagPlaceholder,
  FlagPlaceholderProps,
} from "src/components/atoms/FlagPlaceholder.component";

describe("FlagPlaceholder component", () => {
  test("renders with correct country code", () => {
    const props: FlagPlaceholderProps = {
      countryCode: "US",
    };

    render(<FlagPlaceholder {...props} />);
    const flagPlaceholderElement = screen.getByText("US");

    expect(flagPlaceholderElement).toBeInTheDocument();
  });

  test("renders with additional CSS classes", () => {
    const props: FlagPlaceholderProps = {
      countryCode: "UK",
      className: "extra-class",
    };

    render(<FlagPlaceholder {...props} />);
    const flagPlaceholderElement = screen.getByText("UK");

    expect(flagPlaceholderElement).toHaveClass("extra-class");
  });

  test("forwards additional HTML attributes", () => {
    const props: FlagPlaceholderProps = {
      countryCode: "FR",
      "data-testid": "flag-placeholder",
    };

    render(<FlagPlaceholder {...props} />);
    const flagPlaceholderElement = screen.getByTestId("flag-placeholder");

    expect(flagPlaceholderElement).toBeInTheDocument();
    expect(flagPlaceholderElement).toHaveTextContent("FR");
  });
});
