import "./Footer.css";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { toast } from "react-toastify";

const Footer = () => {
  const [loading, setLoading] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    formData.append("access_key", process.env.WEB_FORM_API); // Use your Web3Forms key

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Subscribed successfully!");
        e.target.reset();
      } else {
        toast.error("Subscription failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="footer-container" id="footer">
      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <h2>Sign up for our newsletter</h2>
            <p>
              The Eats On Click newsletter shares insights on what's next in
              food delivery, restaurant trends, and dining experiences.
            </p>
          </div>
          <div className="newsletter-form">
            <form onSubmit={handleNewsletterSubmit} className="form-container">
              <div className="form-input">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  disabled={loading}
                />
                <button type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "SUBMIT"}
                </button>
              </div>
              <p className="privacy-note">
                We care about the protection of your data. Read our{" "}
                <a href="#">Privacy Policy</a>.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="main-footer">
        <div className="footer-top">
          {/* Logo and Social Media */}
          <div className="footer-brand">
            <div className="footer-logo-container">
              <img
                src={assets.eats_on_click || "/placeholder.svg"}
                alt="Eats On Click"
                className="footer-logo"
              />
            </div>
            <div className="social-icons">
              <a href="#" className="social-icon">
                <img src={assets.facebook_icon} alt="Facebook" />
              </a>
              <a href="#" className="social-icon">
                <img src={assets.instagram_icon} alt="Instagram" />
              </a>
              <a href="#" className="social-icon">
                <img src={assets.twitter_icon} alt="Twitter" />
              </a>
              <a href="#" className="social-icon">
                <img src={assets.linkedin_icon} alt="LinkedIn" />
              </a>
            </div>
            {/* <div className="footer-image">
              <img
                src=""
                alt="Food basket"
                className="food-basket"
              />
            </div> */}
          </div>

          {/* Footer Links */}
          <div className="footer-links">
            <div className="footer-column">
              <h3>Customer Service</h3>
              <ul>
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
                <li>
                  <a href="#">Our Journals</a>
                </li>
                <li>
                  <a href="#">Returns & Refunds</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Delivery Information</a>
                </li>
                <li>
                  <a href="#">Cookie Guidelines</a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Eat On Click</h3>
              <ul>
                <li>
                  <a href="#">About us</a>
                </li>
                <li>
                  <a href="#">Conditions</a>
                </li>
                <li>
                  <a href="#">Our Journals</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">Affiliate Programme</a>
                </li>
                <li>
                  <a href="#">Ultras Press</a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Quick Links</h3>
              <ul>
                <li>
                  <a href="#">Offers</a>
                </li>
                <li>
                  <a href="#">Shop</a>
                </li>
                <li>
                  <a href="#">Track Order</a>
                </li>
                <li>
                  <a href="#">Info</a>
                </li>
                <li>
                  <a href="#">Discount Coupons</a>
                </li>
                <li>
                  <a href="#">Stores</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="divider"></div>
          <p className="copyright">
            © {new Date().getFullYear()} Eats On Click. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
