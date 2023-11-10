// components
import Header from "./components/Header";
import HeroSwiper from "./components/HeroSwiper";
import MainContent from "./components/MainContent";

// css
import "./styles/index.css";

function App() {
  return (
    <div className="container">
      <Header />
      <HeroSwiper />
      <MainContent />
    </div>
  );
}

export default App;
