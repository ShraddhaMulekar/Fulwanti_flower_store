import React from "react";

const FilterBar = ({ setFilter }) => {
  return (
    <select
      onChange={(e) => setFilter(e.target.value)}
      className="mt-1 w-full rounded-xl border border-white/10 bg-[#111111] px-3 py-2 text-xs text-gray-100 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
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
