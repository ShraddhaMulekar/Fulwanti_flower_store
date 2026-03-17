import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";
import { useLocation } from "react-router-dom";

const Section = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-white/10 pt-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between text-left"
      >
        <span className="text-sm font-extrabold text-gray-100">{title}</span>
        <span className="text-gray-400">{open ? "▾" : "▸"}</span>
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
};

const Products = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { items, loading } = useSelector((state) => state.products);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("popular");
  const [priceRange, setPriceRange] = useState([0, 999999]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("search") || "";
    setSearch(q);
  }, [location.search]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const allProducts = items?.allProduct || [];

  const computedPriceBounds = useMemo(() => {
    const prices = allProducts.map((p) => Number(p.price) || 0);
    const min = prices.length ? Math.min(...prices) : 0;
    const max = prices.length ? Math.max(...prices) : 0;
    return { min, max };
  }, [allProducts]);

  useEffect(() => {
    // Initialize price range after products arrive
    setPriceRange([computedPriceBounds.min, computedPriceBounds.max]);
  }, [computedPriceBounds.min, computedPriceBounds.max]);

  const categoryCounts = useMemo(() => {
    const counts = {};
    for (const p of allProducts) {
      const key = (p.category || "other").toLowerCase();
      counts[key] = (counts[key] || 0) + 1;
    }
    return counts;
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    const [minP, maxP] = priceRange;

    let list = allProducts.filter((product) => {
      const name = (product.name || "").toLowerCase();
      const desc = (product.description || "").toLowerCase();
      const matchSearch = !q || name.includes(q) || desc.includes(q);

      const matchCategory =
        !category ||
        (product.category || "").toLowerCase() === category.toLowerCase();

      const price = Number(product.price) || 0;
      const matchPrice = price >= minP && price <= maxP;

      const stock = Number(product.stock) || 0;
      const matchStock = !inStockOnly || stock > 0;

      return matchSearch && matchCategory && matchPrice && matchStock;
    });

    if (sortBy === "price-asc") {
      list = [...list].sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === "price-desc") {
      list = [...list].sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === "name") {
      list = [...list].sort((a, b) =>
        String(a.name || "").localeCompare(String(b.name || "")),
      );
    }

    return list;
  }, [allProducts, category, inStockOnly, priceRange, search, sortBy]);

  const resetFilters = () => {
    setCategory("");
    setInStockOnly(false);
    setSortBy("popular");
    setPriceRange([computedPriceBounds.min, computedPriceBounds.max]);
  };

  return (
    <div className="max-w-6xl mx-auto flex gap-6 animate-fade-up">
      {/* Left: Filter panel */}
      <aside className="bg-[#0b0d10] rounded-2xl border border-white/10 p-4 h-fit sticky top-24 w-[30%]">
        {/* Sort on top (like screenshot left header) */}
        <div className="mb-4">
          <label className="text-[11px] font-semibold text-gray-200 mb-1 block">
            Sort by
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#111111] px-3 py-2 text-xs text-gray-100 outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="popular">Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
        </div>

        <div className="mb-3">
          <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400">
            Fulwanti store
          </p>
          <h2 className="text-lg font-extrabold text-gray-100">FILTERS</h2>
          <p className="text-[11px] text-gray-400">
            {allProducts.length}+ Products
          </p>
        </div>

        {/* Search */}
        <div className="mb-2">
          <p className="text-[11px] font-semibold text-gray-200 mb-1">Search</p>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product / category..."
            className="w-full rounded-xl border border-white/10 bg-[#111111] px-3 py-2 text-xs text-gray-100 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Categories */}
        <Section title="Category" defaultOpen>
          <div className="space-y-2 text-xs">
            <label className="flex items-center gap-2 text-gray-300">
              <input
                type="radio"
                name="category"
                checked={category === ""}
                onChange={() => setCategory("")}
                className="accent-orange-400"
              />
              <span>All</span>
              <span className="ml-auto text-gray-500">
                {allProducts.length}
              </span>
            </label>
            {Object.entries(categoryCounts)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([cat, count]) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 text-gray-300"
                >
                  <input
                    type="radio"
                    name="category"
                    checked={category.toLowerCase() === cat.toLowerCase()}
                    onChange={() => setCategory(cat)}
                    className="accent-orange-400"
                  />
                  <span className="capitalize">{cat}</span>
                  <span className="ml-auto text-gray-500">{count}</span>
                </label>
              ))}
          </div>
        </Section>

        {/* Stock */}
        <Section title="Availability" defaultOpen={false}>
          <label className="flex items-center gap-2 text-xs text-gray-300">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="accent-orange-400"
            />
            In stock only
          </label>
        </Section>

        {/* Price */}
        <Section title="Filter by price" defaultOpen={false}>
          <div className="text-[11px] text-gray-400 mb-2">
            Price: ₹{priceRange[0]} — ₹{priceRange[1]}
          </div>
          <div className="space-y-2">
            <input
              type="range"
              min={computedPriceBounds.min}
              max={computedPriceBounds.max}
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange(([_, max]) => [
                  Math.min(Number(e.target.value), max),
                  max,
                ])
              }
              className="w-full accent-orange-400"
            />
            <input
              type="range"
              min={computedPriceBounds.min}
              max={computedPriceBounds.max}
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange(([min]) => [
                  min,
                  Math.max(Number(e.target.value), min),
                ])
              }
              className="w-full accent-orange-400"
            />
          </div>
        </Section>

        <div className="mt-4">
          <button
            onClick={resetFilters}
            className="w-full px-3 py-2 rounded-xl bg-[#111111] border border-white/10 text-gray-200 text-xs hover:border-orange-400/30 hover:text-orange-300 transition"
          >
            Reset filters
          </button>
        </div>
      </aside>

      {/* Right: Products area */}
      <section className="bg-[#0b0d10] rounded-2xl border border-white/10 p-4 sm:p-6 w-full">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400">
              only fresh blooms
            </p>
            <p className="text-xs text-gray-300">
              Showing{" "}
              <span className="text-orange-300 font-semibold">
                {filteredProducts.length}
              </span>{" "}
              results
            </p>
          </div>
          {loading && (
            <span className="text-xs text-orange-300 animate-pulse">
              Loading...
            </span>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-sm text-gray-400">
            No products match your filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-3 w-full">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Products;
