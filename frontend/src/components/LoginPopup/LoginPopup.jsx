"use client"

import { useContext, useState, useEffect } from "react"
import "./LoginPopup.css"
import { assets } from "../../assets/assets"
import { StoreContext } from "../context/StoreContext"
import axios from "axios"

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext)
  const [currState, setCurrState] = useState("Login")
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData((data) => ({ ...data, [name]: value }))
  }

  const onLogin = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      let newUrl = url
      if (currState === "Login") {
        newUrl += "/api/user/login"
      } else {
        newUrl += "/api/user/register"
      }

      const response = await axios.post(newUrl, data)

      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem("token", response.data.token)
        setShowLogin(false)
      } else {
        alert(response.data.message)
      }
    } catch (error) {
      console.error("Login error:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const switchMode = (mode) => {
    setData({
      name: "",
      email: "",
      password: "",
    })
    setCurrState(mode)
  }

  // Close popup when Escape key is pressed
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setShowLogin(false)
      }
    }

    document.addEventListener("keydown", handleEscKey)
    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [setShowLogin])

  return (
    <div className="login-popup" onClick={() => setShowLogin(false)}>
      <div className="login-popup-container" onClick={(e) => e.stopPropagation()}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <button className="close-button" onClick={() => setShowLogin(false)} aria-label="Close">
            <img src={assets.cross_icon || "/placeholder.svg"} alt="Close" />
          </button>
        </div>

        <div className="login-popup-content">
          <form onSubmit={onLogin} className="login-form">
            <div className="login-popup-inputs">
              {currState === "Sign Up" && (
                <div className="input-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    onChange={onChangeHandler}
                    value={data.name}
                    type="text"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              )}

              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  onChange={onChangeHandler}
                  value={data.email}
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  onChange={onChangeHandler}
                  value={data.password}
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <div className="login-popup-condition">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">By continuing, I agree to the terms of use & privacy policy.</label>
            </div>

            <button type="submit" className={`submit-button ${isLoading ? "loading" : ""}`} disabled={isLoading}>
              {isLoading ? (
                <span className="loading-spinner"></span>
              ) : currState === "Sign Up" ? (
                "Create Account"
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="login-popup-switch">
            {currState === "Login" ? (
              <p>
                Don't have an account? <span onClick={() => switchMode("Sign Up")}>Sign up</span>
              </p>
            ) : (
              <p>
                Already have an account? <span onClick={() => switchMode("Login")}>Login</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPopup
