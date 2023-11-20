// dependencies
import { useContext, useEffect, useState } from "react";

// contexts
import { UserContext } from "../contexts/userContext";

// css
import "../styles/shoppingcartpage.css";

export default function ShoppingCartPage() {
  const { userAccount, setUserAccount } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/carts/user/${userAccount.id}`)
      .then((res) => {
        if (!res.ok || res.status !== 200) {
          throw new Error("Failed to fetch cart data");
        }
        return res.text();
      })
      .then((data) => {
        if (!data) {
          console.error("Empty response from server");
          return;
        }
        const cartData = JSON.parse(data);
        if (cartData && cartData.length > 0 && cartData[0].products) {
          const productPromises = cartData[0].products.map((product) =>
            fetch(`https://fakestoreapi.com/products/${product.productId}`)
              .then((res) => res.json())
              .then((productData) => ({
                ...productData,
                quantity: product.quantity,
              }))
          );
          Promise.all(productPromises)
            .then((products) => setCartItems(products));
        } else {
          console.error("Invalid cart data:", cartData);
        }
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  }, [userAccount.id]);

  // Calculating cart items total quantity and total price
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity),
    0,
  );

  return (
    <div className="shopping-cart-page">
      <header id="login-page-header">
        <a href="/" className="back-link">
          <i className="fa fa-arrow-left" aria-hidden="true"></i> Homepage
        </a>
      </header>

      <div className="details">
        <h1>Your Shopping Cart</h1>
        <div>
          <h2>{totalQuantity} Total Items</h2>
          <h2>${totalPrice.toFixed(2)} Total Price</h2>
        </div>
      </div>

      {cartItems.length > 0 && (
        <button type="button" id="buy-button">
          Buy
          <i className="fa fa-angle-right" aria-hidden="true"></i>
        </button>
      )}

      {cartItems.map((item) => (
        <div key={item.id} className="product">
          <button
            type="button"
            aria-label="Remove item from the cart"
            id="remove-item-button"
          >
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button>
          <h3>{item.title}</h3>
          <p id="description">{item.description}</p>

          <div className="same-line">
            <p id="price">
              ${item.price}
            </p>

            <small>X</small>

            <p id="quantity">{item.quantity}</p>

            <button type="button">-</button>
            <button type="button">+</button>
          </div>

          <p id="total-price">
            ${item.quantity *
              item.price}
          </p>

          <div className="container">
            <img src={item.image} alt={item.title} loading="lazy" />
          </div>
        </div>
      ))}
    </div>
  );
}
