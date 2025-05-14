import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className='navbar-modern'>
      <div className="navbar-left">
        <img className='logo' src={assets.logo || "/placeholder.svg"} alt="Logo" />
      </div>
      
      <div className="navbar-right">
        <div className="profile-container">
          <img 
            className='profile' 
            src={assets.profile_image || "/placeholder.svg"} 
            alt="Profile" 
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          
          {dropdownOpen && (
            <div className="profile-dropdown">
              <div className="dropdown-item">My Profile</div>
              <div className="dropdown-item">Settings</div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-item">Logout</div>
            </div>
          )}
        </div>
      </div>
      
      {/* Close dropdown when clicking outside */}
      {dropdownOpen && (
        <div className="dropdown-overlay" onClick={() => setDropdownOpen(false)}></div>
      )}
    </div>
  )
}

export default Navbar