// dependencies
import { useEffect, useState } from "react";

// components
import LimitedTimeOffers from "./LimitedTimeOffers";
import RecommendedBrands from "./RecommendedBrands";
import TopRated from "./TopRated";
import Footer from "./Footer";

// css
import "../styles/main.css";

export default function MainContent() {
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
      <RecommendedBrands />
      <TopRated products={allProducts} isDataLoaded={isDataLoaded} />
      <Footer />
    </main>
  );
}
