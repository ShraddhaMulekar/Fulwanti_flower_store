import React from 'react'
import {Link} from "react-router-dom"

const Navbar = () => {
  return (
    <div>
      <h2>Fulwanti Flower Shop</h2>

      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/admin">Admin</Link>
    </div>
  )
}

export default Navbar