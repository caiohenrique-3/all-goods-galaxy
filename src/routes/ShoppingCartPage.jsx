// dependencies
import { useContext, useEffect, useState } from "react";

// contexts
import { UserContext } from "../contexts/userContext";

// css
import "../styles/shoppingcartpage.css";

export default function ShoppingCartPage() {
  const { userAccount, setUserAccount } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    if (
      userAccount.cartItems.productIds &&
      userAccount.cartItems.productIds.length > 0
    ) {
      const productPromises = userAccount.cartItems.productIds.map(
        (productId) => {
          const randomNumOfItemsInStock = Math.floor(Math.random() * 14) + 2;

          return fetch(`https://fakestoreapi.com/products/${productId}`)
            .then((res) => res.json())
            .then((productData) => ({
              ...productData,
              quantity: 1,
              stock: randomNumOfItemsInStock,
            }));
        },
      );

      Promise.all(productPromises)
        .then((products) => setCartItems(products))
        .catch((error) => {
          console.error("Error fetching product data:", error);
        });
    } else {
      console.log("No items in the cart");
    }

    setIsLoading(false);
  }, [userAccount.id]);

  // Handling item removal
  function handleRemoveItem(id, itemName) {
    if (window.confirm(`Do you want to remove ${itemName} from your cart?`)) {
      // Remove item from cartItems state
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));

      // Remove item from userAccount context
      setUserAccount((prevUserAccount) => {
        const updatedCartItems = prevUserAccount.cartItems.productIds.filter((
          productId,
        ) => productId !== id);
        return {
          ...prevUserAccount,
          cartItems: { productIds: updatedCartItems },
        };
      });
    }
  }

  // Changing item quantity
  function handleQuantityChange(id, change) {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          // Ensure the quantity doesn't go below 1 or above the stock
          const newQuantity = Math.min(
            Math.max(1, item.quantity + change),
            item.stock,
          );
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  }

  // Calculating cart items total quantity and total price
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity),
    0,
  );

  // Updating localStorage with our new changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(userAccount.cartItems));
  }, [userAccount.cartItems]);

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

      {isLoading && (
        <div>
          <i
            className="fa fa-refresh fa-spin fa-3x fa-fw"
            style={{ color: "var(--ut-orange)", marginTop: "5rem" }}
          >
          </i>
          <span className="sr-only">Loading...</span>
        </div>
      )}

      {cartItems.map((item) => (
        <div key={item.id} className="product">
          <p id="available-in-stock">
            <span style={{ color: "var(--sky-blue)" }}>{item.stock}</span>{" "}
            available in stock
          </p>

          <button
            type="button"
            aria-label="Remove item from the cart"
            id="remove-item-button"
            onClick={() => handleRemoveItem(item.id, item.title)}
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

            <button
              type="button"
              onClick={() => handleQuantityChange(item.id, -1)}
            >
              -
            </button>
            <button
              type="button"
              onClick={() => handleQuantityChange(item.id, 1)}
            >
              +
            </button>
          </div>

          <p id="total-price">
            ${(item.quantity * item.price).toFixed(2)}
          </p>

          <div className="container">
            <img src={item.image} alt={item.title} loading="lazy" />
          </div>
        </div>
      ))}
    </div>
  );
}
