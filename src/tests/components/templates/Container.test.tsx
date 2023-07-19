import { render, screen } from '@testing-library/react';
import { Container, ContainerProps } from 'src/components/templates/Container.component';

describe('Container component', () => {
  test('renders with default props', () => {
    render(<Container data-testid="container"/>);
    const containerElement = screen.getByTestId("container");

    // Assert that the component is rendered
    expect(containerElement).toBeInTheDocument();

    // Assert that the default class "container mx-auto" is applied correctly
    expect(containerElement).toHaveClass('container', 'mx-auto');
  });

  test('renders with additional className', () => {
    const props: ContainerProps = {
      className: 'custom-class',
    };
    render(<Container data-testid="container" {...props} />);
    const containerElement = screen.getByTestId("container");

    // Assert that the additional className is applied correctly
    expect(containerElement).toHaveClass('custom-class');
  });

  test('renders children', () => {
    render(
      <Container data-testid="container">
        <div>Child Element</div>
      </Container>
    );
    const childElement = screen.getByText('Child Element');

    // Assert that the child element is rendered within the Container
    expect(childElement).toBeInTheDocument();

    // Assert that the Container component wraps the children
    const containerElement = screen.getByTestId("container");
    expect(containerElement).toContainElement(childElement);
  });

  test('forwards additional HTML attributes', () => {
    const props: ContainerProps = {
      id: 'container-id',
      'data-testid': 'container-test-id',
    };
    render(<Container {...props} />);
    const containerElement = screen.getByTestId('container-test-id');

    // Assert that the additional HTML attributes are forwarded
    expect(containerElement).toHaveAttribute('id', 'container-id');
    expect(containerElement).toHaveAttribute('data-testid', 'container-test-id');
  });
});
