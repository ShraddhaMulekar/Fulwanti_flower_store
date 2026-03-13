import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToCart } from "../redux/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItem);
  console.log({ cartItems });

  const total = cartItems?.reduce((acc, cur) => acc + cur.price, 0);

  return (
    <div>
      <h2>Your Cart </h2>

      {cartItems === undefined ? (
        <p>Your cart is empty!</p>
      ) : (
        cartItems?.map((cart) => (
          <div>
            {cart.name} - ₹{cart.price}
            <button onClick={() => dispatch(removeToCart(cart._id))}>
              Remove
            </button>
          </div>
        ))
      )}
      {cartItems && <h3>Total: ₹{total}</h3>}
    </div>
  );
};

export default Cart;
