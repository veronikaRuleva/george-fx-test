import { render, screen } from "@testing-library/react";
import { Header, HeaderProps } from "src/components/organisms/Header.component";

describe("Header component", () => {
  test("renders with default props", () => {
    render(<Header />);
    const headerElement = screen.getByRole("banner");

    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveClass("bg-george-blue-300");
  });

  test("renders with additional className", () => {
    const props: HeaderProps = {
      className: "custom-class",
    };
    render(<Header {...props} />);
    const headerElement = screen.getByRole("banner");

    expect(headerElement).toHaveClass("custom-class");
  });

  test("contains GeorgeLogo and header title", () => {
    render(<Header />);
    const georgeLogoElement = screen.getByTestId("george-logo");
    const headerTitleElement = screen.getByRole("heading", {
      name: /george fe test/i,
    });

    expect(georgeLogoElement).toBeInTheDocument();
    expect(headerTitleElement).toBeInTheDocument();
    expect(headerTitleElement).toHaveClass(
      "text-sm",
      "text-white",
      "font-inter",
      "font-semibold"
    );
  });

  test("Container component is used with correct props", () => {
    render(<Header data-testid="header" />);
    const containerElement = screen.getByTestId("container-header");

    expect(containerElement).toHaveAttribute(
      "class",
      expect.stringContaining("flex items-center p-4")
    );
  });
});
