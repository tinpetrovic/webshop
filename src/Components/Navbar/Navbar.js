import React from "react";
import { Link } from "react-router-dom"
import "./navbar.scss"
import { RiShoppingCart2Line } from "react-icons/ri";

export default function Navbar({inCart, itemsTotal}) {
  const itemNmb = inCart.reduce((a,c) => a + c.qt, 0)

  return (
    <div className="navbar-container">
     <h2>Webshop App</h2>
     <div className="navbar-links">
         <h3><Link className="navbar-link" to="/webshop/">Products </Link></h3>
         <h3><Link className="navbar-link basket" to="/webshop/basket">Basket 
         <span className="total">{`${itemsTotal > 0 ? itemsTotal : ""}\u20AC`}</span>
          <RiShoppingCart2Line/>
          <span className={itemsTotal > 1 ? "cart-nmb" : "hidden"}>{itemNmb}</span></Link></h3>
     </div>
    </div>
  );
}