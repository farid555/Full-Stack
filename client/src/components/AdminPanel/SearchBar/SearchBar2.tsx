import React from "react";
import { FiSearch } from "react-icons/fi";

interface Props {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}

const SearchBar2 = ({ searchValue, setSearchValue, placeholder }: Props) => {
  return (
    <div
      className={
        "bg-gray-300 inline-flex items-center justify-between rounded-lg px-2 py-1 w-1/2"
      }
    >
      <input
        type="text"
        className="px-2 text-gray-600 py-2 bg-transparent outline-none w-full"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <FiSearch className="text-gray-600 h-6 w-6" />
    </div>
  );
};

export default SearchBar2;
