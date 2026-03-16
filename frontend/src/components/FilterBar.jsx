import React from "react";

const FilterBar = ({ setFilter }) => {
  return (
    <select
      onChange={(e) => setFilter(e.target.value)}
      className="mt-1 w-full rounded-lg border border-pink-100 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 bg-white"
    >
      <option value="">All</option>
      <option value="rose">Rose</option>
      <option value="tulip">Tulip</option>
      <option value="lily">Lily</option>
      <option value="bouquet">Bouquet</option>
    </select>
  );
};

export default FilterBar;
