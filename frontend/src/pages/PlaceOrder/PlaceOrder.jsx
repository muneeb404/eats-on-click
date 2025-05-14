"use client"

import { useContext, useEffect, useState } from "react"
import "./PlaceOrder.css"
import { StoreContext } from "../../components/context/StoreContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)

  const discount = Number(localStorage.getItem("discount") || 0)

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData((data) => ({ ...data, [name]: value }))
  }

  const placeOrder = async (event) => {
    event.preventDefault()
    const orderItems = []
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        const itemInfo = item
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
    const orderData = {
      address: data,
      items: orderItems,
      amount: Math.max(0, getTotalCartAmount() + 2 - discount),
    }
    const response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    })
    if (response.data.success) {
      const { session_url } = response.data
      localStorage.removeItem("discount") // ✅ Clear discount after placing order
      window.location.replace(session_url)
    } else {
      alert("Error")
    }
  }
  const navigate = useNavigate()
  useEffect(() => {
    if (!token) {
      navigate("/cart")
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart")
    }
  }, [token])

  return (
    <div className="place-order-container">
      <h1 className="checkout-title">Checkout</h1>
      <form onSubmit={placeOrder} className="place-order">
        <div className="place-order-left">
          <div className="form-header">
            <p className="title">Delivery Information</p>
            <div className="secure-badge">
              <i className="lock-icon"></i>
              <span>Secure Checkout</span>
            </div>
          </div>

          <div className="form-section">
            <div className="multi-fields">
              <div className="input-group">
                <input
                  required
                  name="firstName"
                  onChange={onChangeHandler}
                  value={data.firstName}
                  type="text"
                  placeholder="First Name"
                />
              </div>
              <div className="input-group">
                <input
                  required
                  name="lastName"
                  onChange={onChangeHandler}
                  value={data.lastName}
                  type="text"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="input-group">
              <input
                required
                name="email"
                onChange={onChangeHandler}
                value={data.email}
                type="email"
                placeholder="Email Address"
              />
            </div>

            <div className="input-group">
              <input
                required
                name="street"
                onChange={onChangeHandler}
                value={data.street}
                type="text"
                placeholder="Street"
              />
            </div>

            <div className="multi-fields">
              <div className="input-group">
                <input
                  required
                  name="city"
                  onChange={onChangeHandler}
                  value={data.city}
                  type="text"
                  placeholder="City"
                />
              </div>
              <div className="input-group">
                <input
                  required
                  name="state"
                  onChange={onChangeHandler}
                  value={data.state}
                  type="text"
                  placeholder="Region"
                />
              </div>
            </div>

            <div className="multi-fields">
              <div className="input-group">
                <input
                  required
                  name="zipcode"
                  onChange={onChangeHandler}
                  value={data.zipcode}
                  type="text"
                  placeholder="Zip Code"
                />
              </div>
              <div className="input-group">
                <input
                  required
                  name="country"
                  onChange={onChangeHandler}
                  value={data.country}
                  type="text"
                  placeholder="Country"
                />
              </div>
            </div>

            <div className="input-group">
              <input
                required
                name="phone"
                onChange={onChangeHandler}
                value={data.phone}
                type="text"
                placeholder="Phone"
              />
            </div>
          </div>
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Order Summary</h2>
            <div className="cart-items-summary">
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              {discount > 0 && (
                <>
                  <hr />
                  <div className="cart-total-details discount">
                    <p>Discount</p>
                    <p>- ${discount}</p>
                  </div>
                </>
              )}
              <hr />
              <div className="cart-total-details total">
                <b>Total</b>
                <b>${getTotalCartAmount() === 0 ? 0 : Math.max(0, getTotalCartAmount() + 2 - discount)}</b>
              </div>
            </div>
            <button type="submit">PROCEED TO PAYMENT</button>
            <div className="payment-methods">
              <div className="payment-icon visa"></div>
              <div className="payment-icon mastercard"></div>
              <div className="payment-icon amex"></div>
              <div className="payment-icon paypal"></div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PlaceOrder
