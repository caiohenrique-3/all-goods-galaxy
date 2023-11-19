// dependencies
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

// contexts
import { UserContext } from "../contexts/userContext";

// css
import "../styles/headerMenu.css";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function HeaderMenu(props) {
  const { userAccount, setUserAccount } = useContext(UserContext);

  useEffect(() => {
    function handleEscKey(event) {
      if (event.keyCode === 27) {
        props.setHeaderMenuIsOpen(false);
      }
    }

    function handleClickOutside(event) {
      if (event.target.className === "header-overlay") {
        props.setHeaderMenuIsOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [props.open]);

  function handleLogoutClick() {
    confirmAlert({
      title: "Confirm to logout",
      message: "Are you sure?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            localStorage.clear();
            setUserAccount((prevUserAccount) => ({
              ...prevUserAccount,
              username: "",
              logged: false,
            }));
            props.setHeaderMenuIsOpen(false);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  }

  return (
    <section className="header-menu">
      <div className="user-header">
        <h4>
          <i className="fa fa-user-circle" aria-hidden="true"></i>
          {userAccount.logged
            ? "Hello" + " " + userAccount.username
            : "Login into your account"}
        </h4>
      </div>

      <button
        type="button"
        aria-label="Close menu"
        id="close-header-menu-button"
        onClick={props.handleHeaderMenuClick}
      >
        <i className="fa fa-close" aria-hidden="true"></i>
      </button>

      <ul>
        <li>
          <a href="">
            <i className="fa fa-home" aria-hidden="true"></i> Account
          </a>
        </li>

        <li>
          <a href="">
            <i className="fa fa-user" aria-hidden="true"></i> Data
          </a>
        </li>

        <li>
          <a href="">
            <i className="fa fa-shopping-basket" aria-hidden="true"></i> Orders
          </a>
        </li>

        <li>
          <a href="">
            <i className="fa fa-thumbs-up" aria-hidden="true"></i> Reviews
          </a>
        </li>

        <li>
          <a href="">
            <i className="fa fa-phone" aria-hidden="true"></i> Customer service
          </a>
        </li>

        <li>
          <a href="">
            <i className="fa fa-heart" aria-hidden="true"></i> Favorites
          </a>
        </li>
      </ul>

      <div className="account-actions">
        {!userAccount.logged && (
          <>
            <Link to="/login">
              <button type="button" id="login-button">Login</button>
            </Link>

            <Link to="/register">
              <button type="button" id="register-button">Register</button>
            </Link>
          </>
        )}

        {userAccount.logged && (
          <button type="button" id="logout-button" onClick={handleLogoutClick}>
            <i className="fa fa-user-times" aria-hidden="true"></i> Logout
          </button>
        )}
      </div>
    </section>
  );
}
