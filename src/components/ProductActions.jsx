// dependencies
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// contexts
import { UserContext } from "../contexts/userContext";

export default function ProductActions(props) {
  const { userAccount, setUserAccount } = useContext(UserContext);
  const navigate = useNavigate();

  // Shopping Cart actions
  function isProductInCart(productId) {
    return Array.isArray(userAccount.cartItems.productIds) &&
      userAccount.cartItems.productIds.includes(productId);
  }

  function addToCart(productId) {
    const updatedCartItems = {
      ...userAccount.cartItems,
      productIds: [...userAccount.cartItems.productIds, productId],
    };

    setUserAccount((prevUserAccount) => ({
      ...prevUserAccount,
      cartItems: updatedCartItems,
    }));
  }

  function removeFromCart(productId) {
    const updatedCartItems = {
      ...userAccount.cartItems,
      productIds: userAccount.cartItems.productIds.filter(
        (id) => id !== productId,
      ),
    };

    setUserAccount((prevUserAccount) => ({
      ...prevUserAccount,
      cartItems: updatedCartItems,
    }));
  }

  function handleHeartClick() {
    if (!userAccount.logged) {
      navigate("/login");
    } else {
      console.log("clicked!");
    }
  }

  function handleAddToCartClick() {
    if (!userAccount.logged) {
      navigate("/login");
    } else {
      if (isProductInCart(props.productId)) {
        removeFromCart(props.productId);
      } else {
        addToCart(props.productId);
      }
    }
  }

  // Updating localStorage with our new cart
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(userAccount.cartItems));
  }, [userAccount.cartItems]);

  return (
    <div className="actions">
      <a onClick={handleHeartClick}>
        <i className="fa fa-heart"></i>
      </a>

      <a onClick={handleAddToCartClick}>
        <i
          className={`fa ${
            isProductInCart(props.productId)
              ? "fa-minus-square"
              : "fa-cart-plus"
          }`}
        >
        </i>
      </a>
    </div>
  );
}
