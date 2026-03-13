import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.products);

  console.log("items", items)
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filterProducts = items.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <h2>**Flowers**</h2>

      <SearchBar setSearch={setSearch} />

      <FilterBar setFilter={setFilter} />

      <div>
        {filterProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;