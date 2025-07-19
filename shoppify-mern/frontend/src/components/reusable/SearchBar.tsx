import React, { useState, useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { debounce } from "lodash";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search...", onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedOnSearch = useCallback(
    debounce((query: string) => {
      console.log(query)
      onSearch(query);
    }, 1000),
    [onSearch]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    debouncedOnSearch(value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <div className="relative w-full max-w-md flex justify-center items-center">
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleSearchChange}
        className="p-2 border border-gray-300 rounded w-full"
      />
      {searchQuery && (
        <AiOutlineClose
          className="absolute right-3  cursor-pointer text-gray-500"
          onClick={clearSearch}
        />
      )}
    </div>
  );
};

export default SearchBar;
