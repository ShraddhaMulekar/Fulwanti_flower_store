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
    <div className="grid grid-cols-1 lg:grid-cols-[260px,1fr] gap-6">
      {/* Left: Filters */}
      <aside className="bg-white/80 rounded-2xl shadow-md p-4 h-fit sticky top-24 animate-fade-in">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Filter Flowers</h2>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500">
              Search
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name..."
              className="mt-1 w-full rounded-lg border border-pink-100 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500">
              Category
            </label>
            <FilterBar setFilter={setFilter} />
          </div>
        </div>
      </aside>

      {/* Right: Products */}
      <section className="bg-white/80 rounded-2xl shadow-md p-4 sm:p-6 animate-fade-up">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-800">
              Flowers & Bouquets
            </h2>
            <p className="text-xs text-gray-500">
              Pick your favourite blooms. Click a card to view full details.
            </p>
          </div>
          {loading && (
            <span className="text-xs text-pink-500 animate-pulse">
              Loading products...
            </span>
          )}
        </div>

        {filterProducts?.length === 0 ? (
          <p className="text-sm text-gray-500">
            No products match your search / filter.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
