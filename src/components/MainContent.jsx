// dependencies
import { useContext, useEffect, useState } from "react";

// components
import LimitedTimeOffers from "./LimitedTimeOffers";
import FavoritedItems from "./FavoritedItems";
import RecommendedBrands from "./RecommendedBrands";
import TopRated from "./TopRated";
import Footer from "./Footer";

// contexts
import { UserContext } from "../contexts/userContext";

// css
import "../styles/main.css";

export default function MainContent() {
  const { userAccount, setUserAccount } = useContext(UserContext);
  const [allProducts, setAllProducts] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((json) => setAllProducts(json));
    setIsDataLoaded(true);
  }, []);

  return (
    <main>
      <LimitedTimeOffers products={allProducts} isDataLoaded={isDataLoaded} />

      {userAccount.favorites.productIds.length > 0
        ? <FavoritedItems products={allProducts} isDataLoaded={isDataLoaded} />
        : null}

      <RecommendedBrands />
      <TopRated products={allProducts} isDataLoaded={isDataLoaded} />
      <Footer />
    </main>
  );
}
