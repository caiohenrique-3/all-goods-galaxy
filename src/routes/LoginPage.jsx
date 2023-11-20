// dependencies
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

// contexts
import { UserContext } from "../contexts/userContext";

// css
import "../styles/loginpage.css";
import "react-toastify/ReactToastify.css";

export default function LoginPage() {
  const { userAccount, setUserAccount } = useContext(UserContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [validationMessages, setValidationMessages] = useState({
    username: "",
    password: "",
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
            : "Password should be at least 6 characters",
        }));
        break;

      default:
        break;
    }
  }

  function isValidUsername(username) {
    const usernameRegex = /^\w+$/;
    return usernameRegex.test(username);
  }

  function isValidPassword(password) {
    return password.length >= 6;
  }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/users")
      .then((res) => res.json())
      .then((accounts) => {
        accounts.forEach((account) => {
          console.log(
            `Username: ${account.username}, Password: ${account.password}, Email: ${account.email}`,
          );
        });
      });
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error("Invalid username or password");
        }
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          toast.success("Login success!", {
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

          localStorage.setItem("username", formData.username);

          setUserAccount((prevUserAccount) => ({
            ...prevUserAccount,
            username: formData.username,
            logged: true,
          }));
        } else {
          throw new Error("Login failed: No token received");
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        toast.error(error.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <>
      <header id="login-page-header">
        <a href="/" className="back-link">
          <i className="fa fa-arrow-left" aria-hidden="true"></i> Homepage
        </a>
      </header>

      <div className="login-page">
        <h1>Welcome back!</h1>

        <form id="login-page-form" method="post" onSubmit={handleSubmit}>
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
              pattern=".{6,}"
              title="Password should be at least 6 characters long."
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
            <button
              type="submit"
              className="login-button"
              disabled={isSubmitting}
            >
              Login
            </button>
          </div>

          <div className="form-group">
            <a href="/register">Don't have an account?</a>
          </div>
        </form>

        <ToastContainer />
      </div>
    </>
  );
}
