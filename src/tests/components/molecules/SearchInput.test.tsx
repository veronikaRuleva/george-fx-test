import { render, screen, fireEvent } from "@testing-library/react";
import { useSearchParams as mockUseSearchParams } from "react-router-dom";
import {
  SearchInputProps,
  SearchInput,
} from "src/components/molecules/SearchInput.component";

jest.mock("react-router-dom", () => ({
  useSearchParams: jest.fn(),
}));

describe("SearchInput component", () => {
  const mockSetSearchParams = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock useSearchParams hook
    mockUseSearchParams.mockReturnValue([
      { get: jest.fn(), set: mockSetSearchParams },
    ]);
  });

  test("renders correctly with initial value", () => {
    const props: SearchInputProps = {
      "data-testid": "search-input",
    };

    const mockQuery = "usd";
    mockUseSearchParams.mockReturnValue([
      { get: () => mockQuery, set: mockSetSearchParams },
    ]);

    render(<SearchInput {...props} />);

    const searchInput = screen.getByTestId("search-input") as HTMLInputElement;
    expect(searchInput.value).toBe(mockQuery);
  });

  test("handles search input change", () => {
    const props: SearchInputProps = {
      "data-testid": "search-input",
    };

    const mockQuery = "usd";
    mockUseSearchParams.mockReturnValue([
      { get: () => mockQuery, set: mockSetSearchParams },
    ]);

    render(<SearchInput {...props} />);

    const searchInput = screen.getByTestId("search-input") as HTMLInputElement;
    expect(searchInput.value).toBe(mockQuery);
  });
});
