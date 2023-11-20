// dependencies
import { useEffect, useState } from "react";

// components
import Header from "./components/Header";
import HeroSwiper from "./components/HeroSwiper";
import MainContent from "./components/MainContent";

// css
import "./styles/index.css";

function App() {
  const [localStorageEnabled, setLocalStorageEnabled] = useState(true);

  useEffect(() => {
    try {
      // Try to read from and write to localStorage
      localStorage.setItem("localStorageTest", "test");
      localStorage.getItem("localStorageTest");
      localStorage.removeItem("localStorageTest");
    } catch (error) {
      // If an error occurs, set localStorageEnabled to false
      setLocalStorageEnabled(false);
    }
  }, []);

  // When the user gets redirected back here,
  // scroll back to the top of the page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <Header />
      {!localStorageEnabled && (
        <h4 style={{ color: "red", padding: "1rem", textAlign: "center" }}>
          LocalStorage is not enabled in your browser. Some functionalities will
          not work.
        </h4>
      )}
      <HeroSwiper />
      <MainContent />
    </div>
  );
}

export default App;
