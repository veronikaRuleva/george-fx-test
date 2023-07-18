import { ChangeEvent } from "react";
import { Input, InputProps } from "../atoms/Input.component";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

export interface SearchInputProps extends InputProps {}

export const SearchInput = ({ ...props }: SearchInputProps) => {
  let [_, setSearchParams] = useSearchParams();

  function handleSubmit(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setSearchParams({ s: event.target.value });
  }

  return (
    <form className="border border-gray-300 py-2 px-3 rounded-md flex items-center w-full">
      <label htmlFor="header-search">
        <span className="sr-only">Search currencies</span>
      </label>
      <HiMagnifyingGlass className="w-5 h-5 text-gray-500 mr-2" />
      <Input
        type="text"
        id="header-search"
        placeholder="Search..."
        className="text-gray-500 w-full outline-none"
        name="s"
        autoComplete="off"
        onChange={(event) => handleSubmit(event)}
        {...props}
      />
    </form>
  );
};
