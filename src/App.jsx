// dependencies
import { useEffect } from "react";

// components
import Header from "./components/Header";
import HeroSwiper from "./components/HeroSwiper";
import MainContent from "./components/MainContent";

// css
import "./styles/index.css";

function App() {
  // When the user gets redirected back here,
  // scroll back to the top of the page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <Header />
      <HeroSwiper />
      <MainContent />
    </div>
  );
}

export default App;
