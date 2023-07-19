import { renderHook, waitFor } from "@testing-library/react";
import axios from "axios";
import useFetch from "src/hooks/useFetch.hook";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

test("useFetch hook fetches data correctly", async () => {
  const responseData = { message: "Hello, world!" };
  mockedAxios.get.mockResolvedValueOnce({ data: responseData });

  const url = "https://example.com/api/data";
  const { result } = renderHook(() => useFetch(url));

  expect(result.current.isLoading).toBe(true);
  expect(result.current.response).toBeUndefined();
  expect(result.current.isError).toBe(false);

  await waitFor(() => {
    expect(result.current.isLoading).toBe(false);
  });

  expect(result.current.response).toEqual(responseData);
  expect(result.current.isError).toBe(false);
});

test("useFetch hook handles errors correctly", async () => {
  mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

  const url = "https://example.com/api/data";
  const { result } = renderHook(() => useFetch(url));

  expect(result.current.isLoading).toBe(true);
  expect(result.current.response).toBeUndefined();
  expect(result.current.isError).toBe(false);

  await waitFor(() => {
    expect(result.current.isLoading).toBe(false);
  });

  expect(result.current.response).toBeNull();
  expect(result.current.isError).toBe(true);
});
