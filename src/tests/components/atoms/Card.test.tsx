import { render, screen } from "@testing-library/react";
import { Card } from "src/components/atoms/Card.component";

describe("Card component", () => {
  test("renders children correctly", () => {
    render(<Card>Test Content</Card>);
    const contentElement = screen.getByText("Test Content");
    expect(contentElement).toBeInTheDocument();
  });

  test("applies default classes and props correctly", () => {
    render(<Card data-testid="card" />);
    const cardElement = screen.getByTestId("card");
    expect(cardElement).toHaveClass("rounded-xl");
    expect(cardElement).toHaveClass("border");
    expect(cardElement).toHaveClass("border-gray-200");
    expect(cardElement).toHaveClass("p-6");
    expect(cardElement).toHaveClass("rounded-xl");
  });

  test("applies custom class name correctly", () => {
    render(<Card data-testid="card" className="custom-class" />);
    const cardElement = screen.getByTestId("card");
    expect(cardElement).toHaveClass("custom-class");
    expect(cardElement).toHaveClass("rounded-xl");
    expect(cardElement).toHaveClass("border");
    expect(cardElement).toHaveClass("border-gray-200");
    expect(cardElement).toHaveClass("p-6");
  });

  test("does not apply border class when `withBorder` prop is false", () => {
    render(<Card data-testid="card" withBorder={false} />);
    const cardElement = screen.getByTestId("card");
    expect(cardElement).not.toHaveClass("border");
    expect(cardElement).not.toHaveClass("border-gray-200");
  });

  test("renders as the specified element", () => {
    render(<Card as="section" data-testid="card"/>);
    const cardElement = screen.getByTestId("card");
    expect(cardElement).toBeInTheDocument();
    expect(cardElement.tagName).toBe('SECTION');
  });

  test("forwards HTML attributes correctly", () => {
    const dataTestId = "card-component";
    render(<Card data-testid={dataTestId} />);
    const cardElement = screen.getByTestId(dataTestId);
    expect(cardElement).toBeInTheDocument();
  });
});
