import React from "react";
import "./product.scss"
import {
    pic1, pic2,pic3, pic4, pic5
} from "../../images/index"


function Product({handleSelected, product, i, inCart}) {
 
let img= ""
 const checkImage = () => {
     if(i === 0) {
         img = pic1
     }
     if(i === 1) {
        img = pic2
    }
    if(i === 2) {
        img = pic3
    }
    if(i === 3) {
        img = pic4
    }
    if(i === 4) {
        img = pic5
    }
    return img
 }
 
  return (
   <div className="product-container" >
    <img className="product-img" src={checkImage()} alt={product.name}/>
    <h3>{product.name}</h3>
    <p>{`${product.price} \u20AC`}</p>
    <button className="btn product-add-btn" onClick={() => handleSelected(product)} >Add to Cart</button>
   </div>
  );
}

export default Product;
