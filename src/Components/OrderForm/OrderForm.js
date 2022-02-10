import React, {useState, useEffect} from "react";
import "./orderForm.scss"



function OrderForm({formValues, setFormValues, order, setOrder, handleOrder, itemsTotal, inCart, setInCart, ordered, setOrdered, cartOrdered, setCartOrdered, orderPrice, setOrderPrice, finalPrice}) {
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

    const handleChange = (e) => {
        e.preventDefault()
        const {name, value} = e.target 
        setFormValues({...formValues, [name]: value})
        }
        
        const handleSubmit = (e) => {
          e.preventDefault()
          setFormErrors(validate(formValues))
          setIsSubmitted(true)
          setOrdered(true)
          setCartOrdered(inCart)
          setOrderPrice(finalPrice)
          if(Object.keys(formErrors).length === 0 & isSubmitted) {
            console.log(`
            Your order has been placed! 
            Order Details:
            Mail: ${formValues.email},
            Address: ˘${formValues.address},
            Card Number: ${formValues.card},
            Total Price: ${finalPrice}
            `)
            setOrder(false) 
            setInCart([])
          }
          } 

        const validate = (values) => {
          const errors = {}
            if(!values.email) {
              errors.email = "Email is required"
            }
            if(!values.address) {
              errors.address = "Address is required"
            } else if(values.address.length < 4) {
              errors.address = "Not a valid address"
            }
            if(!values.card) {
              errors.card = "Credit card number is required"
            } else if(values.card.length < 16) {
              errors.card = "Credit card number too short"
            } else if(values.card.length > 16) {
              errors.card = "Credit card number too long"
            }
            return errors
          }
        
          useEffect(() => {
              if(Object.keys(formErrors).length === 0 && isSubmitted) {
              }
          }, [formErrors])


  return (
    <div className={order ? "order-form active" : "order-form"}>
        <div className="order-wrapper">
            <h2>Checkout</h2>
            <p>{`TOTAL PRICE (without promotion codes): ${itemsTotal}\u20AC`}</p>
            <hr/>
            <form onSubmit={handleSubmit}>
                <div className="field">
                <label>Email: </label>
                <input 
                name="email"
                value={formValues.email}
                type="email"
                placeholder="Email"
                onChange={handleChange}
                />
                <p className="error">{formErrors.email}</p>
                </div>

                <div className="field">
                <label>Address: </label>
                <input 
                name="address"
                value={formValues.address}
                type="text"
                placeholder="Address - min. 4 characters"
                onChange={handleChange}
                />
                <p className="error">{formErrors.address}</p>
                </div>

                <div className="field">
                <label>Credit Card Number: </label>
                <input 
                name="card"
                value={formValues.card}
                type="password"
                placeholder="Card Number - 16 characters"
                onChange={handleChange}
                />
                <p className="error">{formErrors.card}</p>
                </div>
                {order && 
                <div>
                    <button className="btn submit-btn" type="submit">Submit</button>
                    <button className="btn back-btn" onClick={handleOrder}>Back to Basket</button></div>}
            </form>
        </div>
  </div>
  );
}

export default OrderForm;
