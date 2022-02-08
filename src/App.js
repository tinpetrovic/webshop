import React, {useState, useEffect} from "react";
import { Routes, Route } from "react-router-dom"
import Navbar from "./Components/Navbar/Navbar"
import Main from "./Components/Main/Main"
import Basket from "./Components/Basket/Basket"
import "./global.scss"

function App() {
  const [inCart, setInCart] = useState([])
  const itemsTotal = inCart.reduce((a,c) => a + c.price * c.qt, 0).toFixed(2)


  const handleSelected = (product) => {
    const cart = inCart.find(item => item.id === product.id)
    if(cart) {
     setInCart(inCart.map(y => y.id === product.id ? {...cart, qt: cart.qt + 1} : y))
    } else {
      setInCart([...inCart, {...product, qt: 1}])
    }
 }

 const handleRemove = (product) => {
  if(product.qt > 1) {
    setInCart(inCart.map(y => y.id === product.id ? {...product, qt: product.qt - 1} : y))
   } 
   else {setInCart(inCart.filter(x => x.id !== product.id))
  }
 }


  return (
   <div>
    <Navbar 
      inCart={inCart}
      itemsTotal={itemsTotal}/>
    <Routes>
      <Route exact path="/webshop/" element={
        <Main 
        inCart={inCart}
        setInCart={setInCart}
        handleSelected={handleSelected}
        />}/>
      <Route path="/webshop/basket" element={
        <Basket 
        inCart={inCart}
        setInCart={setInCart}
        handleRemove={handleRemove}
        handleSelected={handleSelected}
        itemsTotal={itemsTotal}
        />}/>
    </Routes>
   </div>
  );
}

export default App;
