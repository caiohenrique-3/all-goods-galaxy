// dependencies
import { useContext, useEffect, useState } from "react";
import { register } from "swiper/element/bundle";

register();

// components
import ProductActions from "./ProductActions";

// contexts
import { UserContext } from "../contexts/userContext";

// css
import "../styles/favoriteditems.css";

export default function FavoritedItems(props) {
  const { userAccount, setUserAccount } = useContext(UserContext);

  // Opening big image when clicking the product
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  function openImageModal(image) {
    setCurrentImage(image);
    setIsModalOpen(true);
  }

  function closeImageModal() {
    setCurrentImage("");
    setIsModalOpen(false);
  }

  // Pressing ESC makes it close
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) closeImageModal();
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const productElements = props.products
    .filter((product) => userAccount.favorites.productIds.includes(product.id))
    .map((product, index) => (
      <swiper-slide lazy="true" key={product.id}>
        <div className="product">
          <div className="product-container">
            <div className="top-elements">
              <div className="rating">
              </div>
              <ProductActions productId={product.id} />
            </div>

            <div className="details-container">
              <div className="details">
                <img
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                  onClick={() => openImageModal(product.image)}
                />
              </div>

              <div className="text-details">
                <h3>{product.title}</h3>
                <h4 id="new-price">
                  ${product.price}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    ));

  return (
    <section id="favorited-items">
      <div className="heading">
        <i className="fa fa-heart" aria-hidden="true"></i>
        <h4>
          Favorited Products
        </h4>
      </div>

      <swiper-container
        loop="true"
        slides-per-view="1"
        autoplay-delay="5000"
        allow-touch-move="false"
      >
        {productElements}
      </swiper-container>

      <a href="/favorites" id="show-all">
        <i className="fa fa-external-link" aria-hidden="true"></i> Show All
      </a>

      {isModalOpen && (
        <div className="modal-background" onClick={closeImageModal}>
          <div
            className="modal-content"
            onClick={(e) =>
              e.stopPropagation()}
          >
            <img src={currentImage} alt="" />
            <button
              type="button"
              className="close-button"
              onClick={closeImageModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
