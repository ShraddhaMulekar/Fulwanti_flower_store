import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cartItems)
  console.log({cart})
  console.log(product);
  return (
    <div>
      <img src={product.image} alt={product.name} width="150" />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>₹{product.price}</p>
      <button onClick={() => dispatch(addToCart(product))}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
