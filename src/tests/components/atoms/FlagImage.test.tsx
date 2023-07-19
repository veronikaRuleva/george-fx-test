import { render, screen } from "@testing-library/react";
import {
  FlagImage,
  FlagImageProps,
} from "src/components/atoms/FlagImage.component";

describe("FlagImage component", () => {
  test("renders with correct image source and alt text", () => {
    const props: FlagImageProps = {
      countryCode: "US",
      pathToFlagImages: "/path/to/flags/",
      imageFileType: "png",
      alt: "United States Flag",
    };

    render(<FlagImage {...props} />);
    const flagImageElement = screen.getByRole("img");

    expect(flagImageElement).toBeInTheDocument();
    expect(flagImageElement).toHaveAttribute("src", "/path/to/flags/us.png");
    expect(flagImageElement).toHaveAttribute("alt", "United States Flag");
  });

  test("renders with additional CSS classes", () => {
    const props: FlagImageProps = {
      countryCode: "UK",
      pathToFlagImages: "/path/to/flags/",
      imageFileType: "jpg",
      alt: "United Kingdom Flag",
      className: "extra-class",
    };

    render(<FlagImage {...props} />);
    const flagImageElement = screen.getByRole("img");

    expect(flagImageElement).toHaveClass("extra-class");
  });

  test("forwards additional HTML attributes", () => {
    const props: FlagImageProps = {
      countryCode: "FR",
      pathToFlagImages: "/path/to/flags/",
      imageFileType: "svg",
      alt: "France Flag",
      "data-testid": "flag-image",
    };

    render(<FlagImage {...props} />);
    const flagImageElement = screen.getByTestId("flag-image");

    expect(flagImageElement).toBeInTheDocument();
    expect(flagImageElement).toHaveAttribute("src", "/path/to/flags/fr.svg");
  });
});
