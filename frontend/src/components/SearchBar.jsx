import React from "react";
import { useRef } from "react";

const SearchBar = ({ setSearch }) => {
  const searchRef = useRef();

  const handleSearch = () => {
    setSearch(searchRef.current.value);
  };

  return (
    <div>
      <input type="text" ref={searchRef} placeholder="Search flower.." />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
