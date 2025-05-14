"use client"
import "./ExploreMenu.css"
import { menu_list } from "../../assets/assets"

const ExploreMenu = ({ category, setCategory }) => {
  const handleCategoryClick = (menuName) => {
    setCategory((prev) => (prev === menuName ? "All" : menuName))
  }

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>

      <p className="explore-menu-text">
        Choose from diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary
        expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a
        time.
      </p>

      <div className="explore-menu-container">
        <div className="explore-menu-list">
          {menu_list.map((item, index) => {
            const isActive = category === item.menu_name
            return (
              <div
                onClick={() => handleCategoryClick(item.menu_name)}
                key={index}
                className={`explore-menu-list-item ${isActive ? "active-item" : ""}`}
              >
                <div className="menu-image-container">
                  <img
                    className={isActive ? "active" : ""}
                    src={item.menu_image || "/placeholder.svg"}
                    alt={item.menu_name}
                    loading="lazy"
                  />
                </div>
                <p className={isActive ? "active-text" : ""}>{item.menu_name}</p>
              </div>
            )
          })}
        </div>
      </div>

      <hr />
    </div>
  )
}

export default ExploreMenu
