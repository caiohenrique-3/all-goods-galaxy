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
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  }, [userAccount.id]);

  // Handling item removal
  function handleRemoveItem(id, itemName) {
    if (window.confirm(`Do you want to remove ${itemName} from your cart?`)) {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }
  }

  // Changing item quantity
  function handleQuantityChange(id, change) {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          if (item.quantity + change === 0) {
            if (
              window.confirm("Do you want to delete this item from your cart?")
            ) {
              return null;
            }
          }
          return { ...item, quantity: item.quantity + change };
        }
        return item;
      }).filter(Boolean) // Filter out null items
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
            style={{ color: "var(--ut-orange)", marginTop: "5rem"}}
          >
          </i>
          <span className="sr-only">Loading...</span>
        </div>
      )}

      {cartItems.map((item) => (
        <div key={item.id} className="product">
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
