import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToCart } from "../redux/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log({ cartItems });

  const total = cartItems?.reduce((acc, cur) => acc + cur.price, 0);

  return (
    <div>
      <h2>Your Cart </h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        cartItems?.map((cart) => (
          <div key={cart._id}>
            <img src={cart.image} alt={cart.name} width="100" />
            {cart.name} - ₹{cart.price}
            <button onClick={() => dispatch(removeToCart(cart._id))}>
              Remove
            </button>
          </div>
        ))
      )}
      {cartItems.length > 0 && <h3>Total: ₹{total}</h3>}
    </div>
  );
};

export default Cart;
