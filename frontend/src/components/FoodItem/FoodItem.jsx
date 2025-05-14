"use client"

import { useContext } from "react"
import "./FoodItem.css"
import { assets } from "../../assets/assets"
import { StoreContext } from "../context/StoreContext"

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext)

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img src={url + "/images/" + image } alt={name} className="food-item-image" />
        <div className="food-item-badge">Premium</div>
      </div>

      <div className="food-item-info">
        <div className="food-item-header">
          <h3 className="food-item-name">{name}</h3>
          <div className="food-item-rating">
            <img src={assets.rating_starts } alt="Rating" />
            <span className="rating-text">4.8</span>
          </div>
        </div>

        <p className="food-item-desc">{description}</p>

        <div className="food-item-footer">
          <div className="food-item-price">${price}</div>

          <div className="food-item-actions">
            {!cartItems[id] ? (
              <button className="add-to-cart" onClick={() => addToCart(id)}>
                <img src={assets.add_icon_white } alt="Add" />
              </button>
            ) : (
              <div className="quantity-control">
                <button className="quantity-btn" onClick={() => removeFromCart(id)}>
                  <img src={assets.remove_icon_red } alt="Remove" />
                </button>
                <span className="quantity-display">{cartItems[id]}</span>
                <button className="quantity-btn" onClick={() => addToCart(id)}>
                  <img src={assets.add_icon_green } alt="Add" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodItem
