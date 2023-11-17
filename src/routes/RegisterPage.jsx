// dependencies
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

// css
import "../styles/registerpage.css";
import "react-toastify/ReactToastify.css";

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

  const [validationMessages, setValidationMessages] = useState({
    email: "",
    username: "",
    password: "",
    phone: "",
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

    // Real-time validation
    validateInput(name, value);
  };

  function validateInput(name, value) {
    switch (name) {
      case "email":
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          email: isValidEmail(value) ? "" : "Invalid email format",
        }));
        break;

      case "username":
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          username: isValidUsername(value) ? "" : "Invalid username format",
        }));
        break;

      case "password":
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          password: isValidPassword(value)
            ? ""
            : "Password should be at least 8 characters",
        }));
        break;

      case "firstName":
      case "lastName":
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          [name]: isValidName(value) ? "" : "Invalid characters in the name.",
        }));
        break;

      case "phone":
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          phone: isValidPhoneNumber(value)
            ? ""
            : "Phone number should be 10 digits long and only numeric characters",
        }));
        break;

      case "city":
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          city: isValidName(value) ? "" : "Invalid characters in the city",
        }));
        break;

      case "street":
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          street: isValidStreet(value)
            ? ""
            : "Invalid characters in the street",
        }));
        break;

      case "number":
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          number: isValidStreetNumber(value)
            ? ""
            : "Invalid characters in street number",
        }));
        break;

      case "zipcode":
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          zipcode: isValidZipCode(value)
            ? ""
            : "Zip code should be five numeric digits",
        }));
        break;

      default:
        break;
    }
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidUsername(username) {
    const usernameRegex = /^\w+$/;
    return usernameRegex.test(username);
  }

  function isValidPassword(password) {
    return password.length >= 8;
  }

  function isValidName(name) {
    const nameRegex = /^[A-Za-z\s\-']+$/;
    return nameRegex.test(name);
  }

  function isValidPhoneNumber(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  }

  function isValidStreet(street) {
    const streetRegex = /^[A-Za-z0-9\s\-',.#&]+$/;
    return streetRegex.test(street);
  }

  function isValidStreetNumber(streetNumber) {
    const streetNumberRegex = /^\d+$/;
    return streetNumberRegex.test(streetNumber);
  }

  function isValidZipCode(zipCode) {
    const zipCodeRegex = /^\d{5}$/;
    return zipCodeRegex.test(zipCode);
  }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    fetch("https://fakestoreapi.com/users", {
      method: "POST",
      body: JSON.stringify(
        {
          email: formData.email,
          username: formData.username,
          password: formData.password,
          name: {
            firstname: formData.firstName,
            lastname: formData.lastName,
          },
          address: {
            city: formData.city,
            street: formData.street,
            number: formData.number,
            zipcode: formData.zipcode,
            geolocation: {
              lat: null,
              long: null,
            },
          },
          phone: formData.phone,
        },
      ),
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Registration success!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            navigate("/");
          }, 3000);
          return res.json();
        } else {
          setIsSubmitting(false);
          toast.error("Registration failed", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          throw new Error("Registration failed");
        }
      })
      .then((json) => console.log(json))
      .catch((error) => {
        setIsSubmitting(false);
        console.error("Error:", error);
      });
  };

  // Making scroll work again
  useEffect(() => {
    document.querySelector("body").style.overflowY = "auto";
  }, []);

  // Workaround for error messages showing on page load
  useEffect(() => {
    const fieldsToReset = ["firstName", "lastName", "city", "street"];

    // Reset validation messages for each field
    setValidationMessages((prevMessages) => {
      const updatedMessages = { ...prevMessages };
      fieldsToReset.forEach((field) => {
        updatedMessages[field] = "";
      });
      return updatedMessages;
    });
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
        <form
          id="register-form"
          onSubmit={handleSubmit}
          method="post"
        >
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

            {validationMessages.email != ""
              ? (
                <div className="error-message">
                  <i className="fa fa-exclamation-triangle" aria-hidden="true">
                  </i>{" "}
                  {validationMessages.email}
                </div>
              )
              : ""}
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
              maxLength="10"
              value={formData.username}
              onChange={handleInputChange}
            />

            {validationMessages.username != ""
              ? (
                <div className="error-message">
                  <i className="fa fa-exclamation-triangle" aria-hidden="true">
                  </i>{" "}
                  {validationMessages.username}
                </div>
              )
              : ""}
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

            {validationMessages.password !== "" && (
              <div className="error-message">
                <i className="fa fa-exclamation-triangle" aria-hidden="true">
                </i>{" "}
                {validationMessages.password}
              </div>
            )}
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

            {validationMessages.firstName != ""
              ? (
                <div className="error-message">
                  <i className="fa fa-exclamation-triangle" aria-hidden="true">
                  </i>{" "}
                  {validationMessages.firstName}
                </div>
              )
              : ""}
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

            {validationMessages.lastName != ""
              ? (
                <div className="error-message">
                  <i className="fa fa-exclamation-triangle" aria-hidden="true">
                  </i>{" "}
                  {validationMessages.lastName}
                </div>
              )
              : ""}
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

            {validationMessages.phone != ""
              ? (
                <div className="error-message">
                  <i className="fa fa-exclamation-triangle" aria-hidden="true">
                  </i>{" "}
                  {validationMessages.phone}
                </div>
              )
              : ""}
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

            {validationMessages.city != ""
              ? (
                <div className="error-message">
                  <i className="fa fa-exclamation-triangle" aria-hidden="true">
                  </i>{" "}
                  {validationMessages.city}
                </div>
              )
              : ""}
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

            {validationMessages.street != ""
              ? (
                <div className="error-message">
                  <i className="fa fa-exclamation-triangle" aria-hidden="true">
                  </i>{" "}
                  {validationMessages.street}
                </div>
              )
              : ""}
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

            {validationMessages.number != ""
              ? (
                <div className="error-message">
                  <i className="fa fa-exclamation-triangle" aria-hidden="true">
                  </i>{" "}
                  {validationMessages.number}
                </div>
              )
              : ""}
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

            {validationMessages.zipcode != ""
              ? (
                <div className="error-message">
                  <i className="fa fa-exclamation-triangle" aria-hidden="true">
                  </i>{" "}
                  {validationMessages.zipcode}
                </div>
              )
              : ""}
          </div>

          <button type="submit" disabled={isSubmitting}>Register</button>
        </form>

        <ToastContainer />
      </div>
    </>
  );
}
