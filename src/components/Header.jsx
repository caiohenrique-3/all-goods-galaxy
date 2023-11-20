// components
import HeaderMenu from "./HeaderMenu";

// dependencies
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// contexts
import { UserContext } from "../contexts/userContext";

// css
import "../styles/header.css";

export default function Header() {
  const [headerMenuIsOpen, setHeaderMenuIsOpen] = useState(false);
  const { userAccount, setUserAccount } = useContext(UserContext);
  const navigate = useNavigate();

  function handleHeaderMenuClick() {
    setHeaderMenuIsOpen((prev) => !prev);
  }

  useEffect(() => {
    if (headerMenuIsOpen) {
      document.querySelector("body").style.overflowY = "hidden";
    } else {
      document.querySelector("body").style.overflowY = "auto";
    }
  }, [headerMenuIsOpen]);

  function handlePageResize() {
    const headerOverlay = document.querySelector(".header-overlay");
    if (headerMenuIsOpen && window.innerWidth >= 1030) {
      headerOverlay.style.display = "block";
    } else {
      headerOverlay.style.display = "none";
    }
  }

  useEffect(() => {
    handlePageResize();
    window.addEventListener("resize", handlePageResize);
    return () => window.removeEventListener("resize", handlePageResize);
  }, [headerMenuIsOpen]);

  function handleCartClick() {
    if (!userAccount.logged) {
      navigate("/login");
    } else {
      navigate("/shopping-cart");
    }
  }

  return (
    <>
      <header>
        <div className="logo-container">
          <a href="">
            <picture>
              <source media="(max-width: 1029px)" srcSet="./icon.png" />
              <source
                media="(min-width: 1030px)"
                srcSet="./allgoodsgalaxy-logo-transparent.svg"
              />
              <img
                src="./icon.png"
                alt="Homepage of AllGoodsGalaxy"
                width="153px"
                height="97px"
              />
            </picture>
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

        <a id="shopping-cart" onClick={handleCartClick}>
          <i
            className="fa fa-shopping-cart"
            aria-label="Check your shopping cart"
          >
          </i>
        </a>

        <button
          type="button"
          id="side-menu-button"
          onClick={handleHeaderMenuClick}
        >
          <i
            className={headerMenuIsOpen && !(window.innerWidth >= 1030)
              ? "fa fa-close"
              : "fa fa-bars"}
            aria-label="Click to show side menu"
          >
          </i>
        </button>
      </header>

      <div className="header-overlay">
      </div>

      {headerMenuIsOpen && (
        <HeaderMenu
          handleHeaderMenuClick={handleHeaderMenuClick}
          setHeaderMenuIsOpen={setHeaderMenuIsOpen}
          open={headerMenuIsOpen}
        />
      )}
    </>
  );
}
