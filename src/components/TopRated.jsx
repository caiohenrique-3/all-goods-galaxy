// dependencies
import { useEffect, useState } from "react";
import { register } from "swiper/element/bundle";

register();

// components
import ProductActions from "./ProductActions";

// css
import "../styles/toprated.css";

export default function TopRated(props) {
  // Generate a random rating
  const [productsWithRatings, setProductsWithRatings] = useState([]);

  function generateRandomRating() {
    // Between 3 and 5 with one decimal point
    return (Math.random() * (5 - 3) + 3).toFixed(1);
  }

  // Generating random count
  function generateRandomCount(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    const productsWithRatings = props.products.map((product) => ({
      ...product,
      rating: generateRandomRating(),
      count: generateRandomCount(5, 300),
    }));

    // Sort products by rating in descending order
    productsWithRatings.sort((a, b) =>
      parseFloat(b.rating) - parseFloat(a.rating)
    );

    setProductsWithRatings(productsWithRatings);
  }, [props.products]);

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

  const productElements = productsWithRatings.map((product, index) => (
    <swiper-slide lazy="true" key={product.id}>
      <div className="product">
        <div className="product-container">
          <div className="top-elements">
            <div className="rating">
              <p>
                <i className="fa fa-star" aria-hidden="true"></i>
                {product.rating} <span>({product.count})</span>
              </p>
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

  // Changing the number of slides when resizing
  const [numberOfSlides, setNumberOfSlides] = useState(1);

  function handleResize() {
    if (window.innerWidth < 640) {
      setNumberOfSlides(1);
    } else if (window.innerWidth >= 640 && window.innerWidth < 1024) {
      setNumberOfSlides(2);
    } else if (window.innerWidth >= 1024 && window.innerWidth < 1600) {
      setNumberOfSlides(3);
    } else {
      setNumberOfSlides(4);
    }
  }

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleNavButtonClick(direction) {
    const swiperEl = document.querySelector(
      "#top-rated swiper-container",
    );

    if (swiperEl) {
      if (direction === "prev") {
        swiperEl.swiper.slidePrev();
      } else if (direction === "next") {
        swiperEl.swiper.slideNext();
      }
    }
  }
  return (
    <section id="top-rated">
      <div className="heading">
        <i className="fa fa-star" aria-hidden="true"></i>
        <h4>
          Top Rated Products
        </h4>
      </div>

      <swiper-container loop="true" slides-per-view={numberOfSlides}>
        {productElements}
      </swiper-container>
      <div className="button-container">
        <button
          type="button"
          onClick={() => handleNavButtonClick("prev")}
          aria-label="Previous Slide"
        >
          <i className="fa fa-angle-left" aria-hidden="true"></i>
        </button>

        <button
          type="button"
          onClick={() => handleNavButtonClick("next")}
          aria-label="Next Slide"
        >
          <i className="fa fa-angle-right" aria-hidden="true"></i>
        </button>
      </div>

      <a href="" id="show-all">
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
