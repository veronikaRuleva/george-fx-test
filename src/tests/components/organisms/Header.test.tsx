import { render, screen } from '@testing-library/react';
import { Header, HeaderProps } from 'src/components/organisms/Header.component';

describe('Header component', () => {
  test('renders with default props', () => {
    render(<Header />);
    const headerElement = screen.getByRole('banner');

    // Assert that the component is rendered
    expect(headerElement).toBeInTheDocument();

    // Assert that the className is applied correctly
    expect(headerElement).toHaveClass('bg-george-blue-300');
  });

  test('renders with additional className', () => {
    const props: HeaderProps = {
      className: 'custom-class',
    };
    render(<Header {...props} />);
    const headerElement = screen.getByRole('banner');

    // Assert that the additional className is applied correctly
    expect(headerElement).toHaveClass('custom-class');
  });

  test('contains GeorgeLogo and header title', () => {
    render(<Header />);
    const georgeLogoElement = screen.getByTestId('george-logo');
    const headerTitleElement = screen.getByRole('heading', { name: /george fe test/i });

    // Assert that the GeorgeLogo is rendered
    expect(georgeLogoElement).toBeInTheDocument();

    // Assert that the header title is rendered
    expect(headerTitleElement).toBeInTheDocument();

    // Assert that the header title has the correct styles
    expect(headerTitleElement).toHaveClass('text-sm', 'text-white', 'font-inter', 'font-semibold');
  });

  test('Container component is used with correct props', () => {
    render(<Header />);
    const containerElement = screen.getByRole('banner').firstElementChild;

    // Assert that the Container component is used
    expect(containerElement).toHaveAttribute('class', expect.stringContaining('flex items-center p-4'));
  });
});
