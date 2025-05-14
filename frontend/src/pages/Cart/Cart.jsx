import React, { useContext, useState } from 'react';
import './Cart.css'
import { StoreContext } from '../../components/context/StoreContext'
import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');

  const handlePromoSubmit = () => {
    if (promoCode === 'DISCOUNT10') {
      setDiscount(10);
      setError('');
      localStorage.setItem("discount", 10);
    } else if (promoCode === 'FLASH20') {
      setDiscount(20);
      setError('');
      localStorage.setItem("discount", 20);
    } else if (promoCode === 'SAVE5') {
      setDiscount(5);
      setError('');
      localStorage.setItem("discount", 5);
    } else {
      setDiscount(0);
      setError('Invalid promo code');
      localStorage.removeItem("discount");
    }
  };

  const navigate = useNavigate();
  
  // Check if cart is empty
  const isCartEmpty = Object.values(cartItems).every(quantity => quantity === 0);

  return (
    <div className='cart-container'>
      <div className="cart-header">
        <h2>Your Cart</h2>
        <p>Review your items and proceed to checkout</p>
      </div>

      <div className="cart-content">
        <div className="cart-items-section">
          <div className="cart-card">
            {isCartEmpty ? (
              <div className="cart-empty">
                <div className="empty-cart-icon">
                  <img src={assets.cart_icon || "/placeholder.svg"} alt="Empty Cart" />
                </div>
                <h3>Your cart is empty</h3>
                <p>Add some delicious items to your cart and come back!</p>
              </div>
            ) : (
              <>
                <div className="cart-items-header">
                  <div className="cart-header-item">Item</div>
                  <div className="cart-header-price">Price</div>
                  <div className="cart-header-quantity">Qty</div>
                  <div className="cart-header-total">Total</div>
                  <div className="cart-header-remove"></div>
                </div>
                
                <div className="cart-items-list">
                  {food_list.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                      return (
                        <div key={index} className="cart-item">
                          <div className="cart-item-details">
                            <div className="cart-item-image">
                              <img src={url + "/images/" + item.image || "/placeholder.svg"} alt={item.name} />
                            </div>
                            <div className="cart-item-name">
                              <h4>{item.name}</h4>
                            </div>
                          </div>
                          <div className="cart-item-price">${item.price}</div>
                          <div className="cart-item-quantity">{cartItems[item._id]}</div>
                          <div className="cart-item-total">${item.price * cartItems[item._id]}</div>
                          <div className="cart-item-remove">
                            <button 
                              className="remove-btn" 
                              onClick={() => removeFromCart(item._id)}
                              aria-label="Remove item"
                            >
                              <img src={assets.cross_icon_red || "/placeholder.svg"} alt="Remove" />
                            </button>
                          </div>
                        </div>
                      )
                    }
                    return null;
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="cart-sidebar">
          <div className="cart-summary-card">
            <h3>Order Summary</h3>
            
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>${getTotalCartAmount()}</span>
            </div>
            
            <div className="cart-summary-row">
              <span>Delivery Fee</span>
              <span>${getTotalCartAmount() === 0 ? 0 : 2}</span>
            </div>
            
            {discount > 0 && (
              <div className="cart-summary-row discount">
                <span>Discount</span>
                <span>- ${discount}</span>
              </div>
            )}
            
            <div className="cart-summary-divider"></div>
            
            <div className="cart-summary-row total">
              <span>Total</span>
              <span>${getTotalCartAmount() === 0 ? 0 : Math.max(0, getTotalCartAmount() + 2 - discount)}</span>
            </div>
            
            <button 
              className="checkout-btn" 
              onClick={() => navigate('/order')}
              disabled={isCartEmpty}
            >
              Proceed to Checkout
            </button>
          </div>
          
          <div className="promo-card">
            <h3>Promo Code</h3>
            <p>If you have a promo code, enter it here</p>
            
            <div className="promo-input-group">
              <input
                type="text"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button onClick={handlePromoSubmit}>Apply</button>
            </div>
            
            {error && <p className="promo-error">{error}</p>}
            {discount > 0 && <p className="promo-success">Promo applied: ${discount} off</p>}
            
            <div className="available-promos">
              <p className="available-promos-title">Available Promo Codes:</p>
              <ul>
                <li><span className="promo-code">DISCOUNT10</span> - $10 off your order</li>
                <li><span className="promo-code">FLASH20</span> - $20 off your order</li>
                <li><span className="promo-code">SAVE5</span> - $5 off your order</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart