// dependencies
import { useEffect } from "react";

// css
import "../styles/registerpage.css";

export default function RegisterPage() {
  // Making scroll work again
  useEffect(() => {
    document.querySelector("body").style.overflowY = "auto";
  }, []);

  return (
    <>
      <header id="register-page-header">
        <a href="/" className="back-link">
          <i className="fa fa-arrow-left" aria-hidden="true"></i>{" "}
          Go back to homepage
        </a>
      </header>

      <div className="register-page">
        <form id="register-form">
          <h2>Basic Info</h2>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>

          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" required />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" required />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input type="text" id="phone" name="phone" required />
          </div>

          <h2>Address</h2>

          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input type="text" id="city" name="city" required />
          </div>

          <div className="form-group">
            <label htmlFor="street">Street:</label>
            <input type="text" id="street" name="street" required />
          </div>

          <div className="form-group">
            <label htmlFor="number">Number:</label>
            <input type="text" id="number" name="number" required />
          </div>

          <div className="form-group">
            <label htmlFor="zipcode">Zipcode:</label>
            <input type="text" id="zipcode" name="zipcode" required />
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
}
