import React from "react";

const FilterBar = ({ setFilter }) => {
  return (
    <select onChange={(e) => setFilter(e.target.value)}>
      <option value="">All</option>
      <option value="rose">Rose</option>
      <option value="tulip">Tulip</option>
      <option value="lily">Lily</option>
    </select>
  );
};

export default FilterBar;
