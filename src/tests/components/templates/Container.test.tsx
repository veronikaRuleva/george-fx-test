import { render, screen } from "@testing-library/react";
import {
  Container,
  ContainerProps,
} from "src/components/templates/Container.component";

describe("Container component", () => {
  test("renders with default props", () => {
    render(<Container data-testid="container" />);
    const containerElement = screen.getByTestId("container");

    expect(containerElement).toBeInTheDocument();
    expect(containerElement).toHaveClass("container", "mx-auto");
  });

  test("renders with additional className", () => {
    const props: ContainerProps = {
      className: "custom-class",
    };
    render(<Container data-testid="container" {...props} />);
    const containerElement = screen.getByTestId("container");

    expect(containerElement).toHaveClass("custom-class");
  });

  test("renders children", () => {
    render(
      <Container data-testid="container">
        <div>Child Element</div>
      </Container>
    );
    const childElement = screen.getByText("Child Element");

    expect(childElement).toBeInTheDocument();

    const containerElement = screen.getByTestId("container");
    expect(containerElement).toContainElement(childElement);
  });

  test("forwards additional HTML attributes", () => {
    const props: ContainerProps = {
      id: "container-id",
      "data-testid": "container-test-id",
    };
    render(<Container {...props} />);
    const containerElement = screen.getByTestId("container-test-id");

    expect(containerElement).toHaveAttribute("id", "container-id");
    expect(containerElement).toHaveAttribute(
      "data-testid",
      "container-test-id"
    );
  });
});
