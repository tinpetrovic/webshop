import React from "react";
import "./main.scss"
import data from "../../Data/data.json"
import Product from "../Product/Product"

export default function Main({inCart, setInCart, handleSelected}) {
  const {products} = data

  


  return (
    <div className="main-container">
      <div className="main-wrapper">
        <h1>Products</h1>
        <div className="products-wrapper">
          {products.map((product, i) => {
            return <Product
            products={products}
            inCart={inCart}
            setInCart={setInCart}
            key={product.id}
            i={i} 
            product={product}
            handleSelected={handleSelected}
            />
          })}
        </div>
      </div>
    </div>
  );
}
