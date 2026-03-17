import React, { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";
import { useLocation } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { items, loading } = useSelector((state) => state.products);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("search") || "";
    setSearch(q);
  }, [location.search]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filterProducts = items.allProduct?.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchFilter =
      filter === "" || product.category?.toLowerCase() === filter.toLowerCase();

    return matchSearch && matchFilter;
  });

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[280px,1fr] gap-6 animate-fade-up">
      {/* Left: Filters */}
      <aside className="bg-[#0b0d10] rounded-2xl border border-white/10 p-4 h-fit sticky top-24">
        <div className="mb-3">
          <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400">
            Fulwanti store
          </p>
          <h2 className="text-lg font-extrabold text-gray-100">
            Filter Flowers
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[11px] font-semibold text-gray-300">
              Search
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name..."
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#111111] px-3 py-2 text-xs text-gray-100 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-300">
              Category
            </label>
            <FilterBar setFilter={setFilter} />
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-white/10 bg-[#111111] p-3">
          <p className="text-[11px] text-gray-300 font-semibold mb-1">
            Quick tips
          </p>
          <p className="text-[11px] text-gray-400">
            Click a card to view details. Use filters to find blooms faster.
          </p>
        </div>
      </aside>

      {/* Right: Products */}
      <section className="bg-[#0b0d10] rounded-2xl border border-white/10 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400">
              only fresh blooms
            </p>
            <h2 className="text-2xl font-extrabold text-gray-100">
              Flowers & Bouquets
            </h2>
            <p className="text-xs text-gray-400">
              Pick your favourite blooms. Click a card to view full details.
            </p>
          </div>
          {loading && (
            <span className="text-xs text-orange-300 animate-pulse">
              Loading products...
            </span>
          )}
        </div>

        {filterProducts?.length === 0 ? (
          <p className="text-sm text-gray-400">
            No products match your search / filter.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filterProducts?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Products;
