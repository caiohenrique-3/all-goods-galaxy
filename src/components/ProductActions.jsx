// dependencies
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// contexts
import { UserContext } from "../contexts/userContext";

export default function ProductActions(props) {
  const { userAccount, setUserAccount } = useContext(UserContext);
  const navigate = useNavigate();

  // Cart actions
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

  // Favorites actions
  function isProductInFavorites(productId) {
    return Array.isArray(userAccount.favorites.productIds) &&
      userAccount.favorites.productIds.includes(productId);
  }

  function addToFavorites(productId) {
    const updatedFavorites = {
      ...userAccount.favorites,
      productIds: [...userAccount.favorites.productIds, productId],
    };

    setUserAccount((prevUserAccount) => ({
      ...prevUserAccount,
      favorites: updatedFavorites,
    }));
  }

  function removeFromFavorites(productId) {
    const updatedFavorites = {
      ...userAccount.favorites,
      productIds: userAccount.favorites.productIds.filter(
        (id) => id !== productId,
      ),
    };

    setUserAccount((prevUserAccount) => ({
      ...prevUserAccount,
      favorites: updatedFavorites,
    }));
  }

  function handleHeartClick() {
    if (!userAccount.logged) {
      navigate("/login");
    } else {
      if (isProductInFavorites(props.productId)) {
        removeFromFavorites(props.productId);
      } else {
        addToFavorites(props.productId);
      }
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

  // Updating localStorage with our new favorites
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(userAccount.favorites));
  }, [userAccount.favorites]);

  return (
    <div className="actions">
      <a onClick={handleHeartClick} id="favorite-button">
        <i
          className="fa fa-heart"
          style={{
            color: isProductInFavorites(props.productId) ? "red" : "white",
          }}
        >
        </i>
      </a>

      <a onClick={handleAddToCartClick} id="cart-button">
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
