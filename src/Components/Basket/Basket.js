import React, {useState, useEffect} from "react";
import "./basket.scss"
import "./promotions.scss"
import OrderForm from "../OrderForm/OrderForm"

export default function Basket({inCart, setInCart, handleRemove, handleSelected, itemsTotal }) {
  let finalPrice = itemsTotal
  const initialValues = {email: "", address: "", card:""}
  
  const [ordered, setOrdered] = useState(false)
  const [cartOrdered, setCartOrdered] = useState([])
  const [formValues, setFormValues] = useState(initialValues)
  const [orderPrice, setOrderPrice] = useState([])
  const [code, setCode] = useState("")
  const [codeErrors, setCodeErrors] = useState("")
  const [isSubmit, setIsSubmit] = useState(false)
  
  
  const [prom1, setProm1] = useState(false)
  const [prom2, setProm2] = useState(false)
  const [prom3, setProm3] = useState(false)
  const [order, setOrder] = useState(false)

if (prom1) {
  finalPrice = (itemsTotal - itemsTotal * 0.2).toFixed(2)
} else if (prom2) {
  finalPrice = ((itemsTotal - (itemsTotal * 0.05))).toFixed(2)
  if (prom3) {
    finalPrice = (finalPrice - 20).toFixed(2)
  }
} else if (prom3) {
  finalPrice = (itemsTotal - 20).toFixed(2)
  if(prom2) {
    finalPrice = (finalPrice - (finalPrice * 0.5)).toFixed(2)
  }
} 

const handleOrder = (e) => {
  e.preventDefault()
  setOrder(!order)
}

useEffect(() => {
  for(let i = 0; i < inCart.length; i++) {
    if (inCart[i].name === "Motion Sensor" && inCart[i].qt % 3 === 0) {
     setInCart(inCart.map(y => y.id === inCart[i].id ? {...inCart[i], price: 21.66666667} : y))
   } else if (inCart[i].name === "Smoke Sensor" && inCart[i].qt % 2 === 0) {
    setInCart(inCart.map(y => y.id === inCart[i].id ? {...inCart[i], price: 17.5} : y))
  }
}
}, [itemsTotal])


const handleChange = (e) => {
e.preventDefault()
const {value} = e.target
setCode(value)
}

const handleSubmit = (e) => {
e.preventDefault()
setCodeErrors(validation(code))
setIsSubmit(true)
}

const validation = (value) => {
  let errors = ""
  if (!value) {
    errors = "No code entered!"
  } else if (value === "20%OFF" && prom2 === false && prom3 === false) {
    setProm1(true)
  } else if (value === "20%OFF" && prom2 === true) {
    errors = "Cannot combine this promotions!"
  } else if (value === "20%OFF" && prom3 === true) {
    errors = "Cannot combine this promotions!"
  } else if (value === "5%OFF" && prom1 === false) {
    setProm2(true)
  } else if (value === "5%OFF" && prom1 === true) {
    errors = "Cannot combine this promotions!"
  } else if (value === "20EUROOFF" && prom1 === false) {
    setProm3(true)
  } else if (value === "20EUROOFF" && prom1 === true) {
    errors = "Cannot combine this promotions!"
  } else if (value !=="20%OFF" || value !=="5%OFF" || value !=="20EUROOFF") {
    errors = "Not a valid code!"
  }
  return errors
}

useEffect(() => {
  if(Object.keys(codeErrors).length === 0 && isSubmit) {
  }
  console.log(codeErrors)
}, [codeErrors])


  return (
    <div className="basket-container">
      <OrderForm
      finalPrice={finalPrice}
      itemsTotal={itemsTotal}
      inCart={inCart}
      setInCart={setInCart}
      order={order}
      setOrder={setOrder}
      ordered={ordered}
      setOrdered={setOrdered}
      formValues={formValues}
      setFormValues={setFormValues}
      handleOrder={handleOrder}
      cartOrdered={cartOrdered}
      setCartOrdered={setCartOrdered}
      orderPrice={orderPrice}
      setOrderPrice={setOrderPrice}
      />

      <h1>Basket</h1>
      {inCart < 1 ? 
      <div>
        <h2 className="empty-basket">Your basket is empty!</h2>
        {ordered && 
        <div className="my-order">
          <h2>My order</h2>
          <p><span className="my-order--heading">Mail: </span>{formValues.email}</p>
          <p><span className="my-order--heading">Address: </span>{formValues.address}</p>
          <p><span className="my-order--heading">Credit Card Number: </span>{formValues.card}</p>
          <div>
            <span className="my-order--heading">Items Ordered:</span>
            {cartOrdered.map((item, i) => {
              return <p key={i}>{item.name}, qt: {item.qt}</p>
            })}
          </div>
          <p><span className="my-order--heading">TOTAL: </span>{`${orderPrice} \u20AC`}</p>
        </div>}
      </div>
      : 
      <div className="basket-wrapper">
          <button className="btn clear-btn" onClick={() => setInCart([])}>Clear Basket</button>
      {inCart.map(item => {
        return <div key={item.id} className="basket-item">  
         <div className="name-btn-wrapp">
          <h2>{item.name}</h2>
          <div className="basket-btn-wrapper">
            <button className="btn basket-remove-btn" onClick={() => handleRemove(item)}>-</button>
            <p>{item.qt}</p>
            <button className="btn basket-add-btn" onClick={() => handleSelected(item)}>+</button>
        </div>
        </div>  
          <h2>{`${(item.price * item.qt).toFixed(2)} \u20AC`}</h2>
        </div>
      })}
        <div className="basket-total">
          <h2 >{`TOTAL: ${finalPrice} \u20AC`}</h2>
          <button className="btn order-btn" onClick={handleOrder}>Place Order</button>
        </div>
        
        
        <div className="promotions-container">
        <h3>Promotion codes:</h3>
          <div className="promotion-form">
            <form onSubmit={handleSubmit}>
              <label>
                Code:
                <input
                name="codes"
                value={code}
                type="text"
                placeholder="Type promo code"
                onChange={handleChange}
                />
                <p className="error">{codeErrors && codeErrors}</p>
              </label>
              <button className="btn code-btn" type="submit">Submit code</button>
            </form>
          
            <div className="promotions-btns-wrapper">
              {prom1 && <button className="prom-btn clear-prom-btn" onClick={() => setProm1(false)}>Clear 20% OFF</button>}
              {prom2 && <button className="prom-btn clear-prom-btn" onClick={() => setProm2(false)}>Clear 5% OFF</button>}
              {prom3 && <button className="prom-btn clear-prom-btn" onClick={() => setProm3(false)}>Clear 20 EURO OFF</button>}
            </div> 
          </div>
         </div>
      </div>}
    </div>
  );
}