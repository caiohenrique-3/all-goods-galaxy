// css
import "../styles/header.css";

export default function Header() {
  return (
    <header>
      <div className="logo-container">
        <a href="">
          <img
            src="./icon.png"
            alt="Homepage of AllGoodsGalaxy"
            width="153px"
            height="97px"
          />
        </a>
      </div>

      <form id="search-form">
        <input
          id="search-input"
          autoComplete="off"
          placeholder="Search..."
        />
        <button type="submit" aria-label="Search" id="search-button">
          <i className="fa fa-search"></i>
        </button>
      </form>

      <a href="" id="shopping-cart">
        <i
          className="fa fa-shopping-cart"
          aria-label="Check your shopping cart"
        >
        </i>
      </a>

      <button type="button" id="side-menu-button">
        <i className="fa fa-bars" aria-label="Click to show side menu"></i>
      </button>
    </header>
  );
}
