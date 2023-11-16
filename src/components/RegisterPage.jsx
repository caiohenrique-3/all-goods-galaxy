// dependencies
import { useEffect, useState } from "react";

// css
import "../styles/registerpage.css";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    street: "",
    number: "",
    zipcode: "",
  });

  // Update form data as the user types
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

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
        <form id="register-form" onClick={handleSubmit} method="post">
          <h2>Basic Info</h2>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              pattern="\w+"
              title="Username should only contain letters, numbers and underscores."
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              pattern=".{8,}"
              title="Password should be at least 8 characters long."
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              pattern="[0-9]{10}"
              title="Phone number should be 10 digits long."
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <h2>Address</h2>

          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              required
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="street">Street:</label>
            <input
              type="text"
              id="street"
              name="street"
              required
              value={formData.street}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="number">Number:</label>
            <input
              type="text"
              id="number"
              name="number"
              required
              pattern="[0-9]+"
              title="Number should only contain digits."
              value={formData.number}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="zipcode">Zipcode:</label>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              required
              pattern="[0-9]{5}"
              title="Zipcode should be 5 digits long."
              value={formData.zipcode}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
}
