import { render, screen } from '@testing-library/react';
import { Input, InputProps } from 'src/components/atoms/Input.component';

describe('Input component', () => {
  test('renders with correct class name', () => {
    const props: InputProps = {
      className: 'custom-input',
    };

    render(<Input {...props} />);
    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass('custom-input');
  });

  test('forwards additional HTML attributes', () => {
    const props: InputProps = {
      'data-testid': 'custom-input',
      placeholder: 'Enter value',
    };

    render(<Input {...props} />);
    const inputElement = screen.getByTestId('custom-input');

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('placeholder', 'Enter value');
  });
});
