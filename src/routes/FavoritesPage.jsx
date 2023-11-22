// dependencies
import { useContext, useEffect, useState } from "react";

// contexts
import { UserContext } from "../contexts/userContext";

// css
import "../styles/favoritespage.css";

export default function ShoppingCartPage() {
  const { userAccount, setUserAccount } = useContext(UserContext);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    if (
      userAccount.favorites.productIds &&
      userAccount.favorites.productIds.length > 0
    ) {
      const productPromises = userAccount.favorites.productIds.map(
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
        .then((products) => setFavoriteItems(products))
        .catch((error) => {
          console.error("Error fetching product data:", error);
        });
    } else {
      console.log("No favorite items");
    }

    setIsLoading(false);
  }, [userAccount.id]);

  // Handling item removal
  function handleRemoveItem(id, itemName) {
    if (
      window.confirm(`Do you want to remove ${itemName} from your favorites?`)
    ) {
      // Remove item from favoriteItems state
      setFavoriteItems((prevItems) =>
        prevItems.filter((item) => item.id !== id)
      );

      // Remove item from userAccount context
      setUserAccount((prevUserAccount) => {
        const updatedFavoriteItems = prevUserAccount.favorites.productIds
          .filter((
            productId,
          ) => productId !== id);
        return {
          ...prevUserAccount,
          favorites: { productIds: updatedFavoriteItems },
        };
      });
    }
  }

  // Updating localStorage with our new changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(userAccount.favorites));
  }, [userAccount.favorites]);

  return (
    <div className="favorites-page">
      <header id="login-page-header">
        <a href="/" className="back-link">
          <i className="fa fa-arrow-left" aria-hidden="true"></i> Homepage
        </a>
      </header>

      <div className="details">
        <h1>Your Favorited Items</h1>
      </div>

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

      {favoriteItems.map((item) => (
        <div key={item.id} className="product">
          <button
            type="button"
            aria-label="Remove item from the favorites"
            id="remove-item-button"
            onClick={() => handleRemoveItem(item.id, item.title)}
          >
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button>
          <h3>{item.title}</h3>
          <p id="description">{item.description}</p>

          <p id="total-price">
            ${item.price.toFixed(2)}
          </p>

          <div className="container">
            <img src={item.image} alt={item.title} loading="lazy" />
          </div>
        </div>
      ))}
    </div>
  );
}
