import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'
import './Sidebar.css'

const Sidebar1 = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button - only visible on small screens */}
      <button 
        className="sidebar-mobile-toggle" 
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <div className={`hamburger ${mobileOpen ? 'active' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      
      <div className={`sidebar-modern ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-modern-header">
          <h2>Admin Panel</h2>
          <button 
            className="sidebar-close-btn" 
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>
        <div className="sidebar-modern-options">
          <NavLink 
            to='/add' 
            className={({ isActive }) => 
              isActive ? "sidebar-modern-option active" : "sidebar-modern-option"
            }
            onClick={() => setMobileOpen(false)}
          >
            <div className="modern-icon-container">
              <img src={assets.add_icon || "/placeholder.svg"} alt="Add" />
            </div>
            <p>Add Items</p>
          </NavLink>

          <NavLink 
            to='/list' 
            className={({ isActive }) => 
              isActive ? "sidebar-modern-option active" : "sidebar-modern-option"
            }
            onClick={() => setMobileOpen(false)}
          >
            <div className="modern-icon-container">
              <img src={assets.order_icon || "/placeholder.svg"} alt="List" />
            </div>
            <p>List Items</p>
          </NavLink>

          <NavLink 
            to='/orders' 
            className={({ isActive }) => 
              isActive ? "sidebar-modern-option active" : "sidebar-modern-option"
            }
            onClick={() => setMobileOpen(false)}
          >
            <div className="modern-icon-container">
              <img src={assets.order_icon || "/placeholder.svg"} alt="Orders" />
            </div>
            <p>Orders</p>
          </NavLink>
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {mobileOpen && (
        <div className="sidebar-overlay" onClick={() => setMobileOpen(false)}></div>
      )}
    </>
  )
}

export default Sidebar1