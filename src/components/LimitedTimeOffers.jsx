// dependencies
import { useEffect, useState } from "react";
import { register } from "swiper/element/bundle";

register();

// css
import "../styles/limitedtimeoffers.css";

export default function LimitedTimeOffers(props) {
  const [countdowns, setCountdowns] = useState([]);
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    // Randomizing Offer Countdown Timer
    const newCountdowns = props.products.map(() => generateRandomCountdown());
    setCountdowns(newCountdowns);

    // Randomizing discount value for each product
    const newDiscounts = props.products.map(() => generateRandomDiscount());
    setDiscounts(newDiscounts);

    // Set up individual intervals for each product
    const intervals = newCountdowns.map((countdown, index) => {
      return setInterval(() => {
        setCountdowns((prevCountdowns) => {
          const newCountdowns = [...prevCountdowns];
          if (newCountdowns[index] > 0) {
            newCountdowns[index] -= 1;
          }
          return newCountdowns;
        });
      }, 1000);
    });

    return () => {
      // Cleanup intervals on component unmount
      intervals.forEach((interval) => clearInterval(interval));
    };
  }, [props.products]);

  function generateRandomCountdown() {
    const minSeconds = 1 * 24 + 60 + 60; // 1 day in seconds
    const maxSeconds = 3 * 24 * 60 * 60; // 3 days in seconds

    const randomSeconds =
      Math.floor(Math.random() * (maxSeconds - minSeconds + 1)) + minSeconds;

    return randomSeconds;
  }

  function generateRandomDiscount() {
    const minDiscount = 5;
    const maxDiscount = 30;

    return Math.floor(Math.random() * (maxDiscount - minDiscount + 1)) +
      minDiscount;
  }

  function formatTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const formatNumber = (num) => (num < 10 ? `0${num}` : num);

    return `${formatNumber(hours)}:${formatNumber(minutes)}:${
      formatNumber(seconds)
    }`;
  }

  const productElements = props.products.map((product, index) => (
    <swiper-slide lazy="true" key={product.id}>
      <div className="product">
        <div className="product-container">
          <div className="top-elements">
            <div className="discount">
              <p>
                <i className="fa fa-caret-down" aria-hidden="true"></i>
                {discounts[index]}%
              </p>
            </div>
            <div className="actions">
              <a href="">
                <i className="fa fa-heart"></i>
              </a>
              <a href="">
                <i className="fa fa-cart-plus"></i>
              </a>
            </div>
          </div>

          <div className="details-container">
            <div className="details">
              <img src={product.image} alt={product.title} loading="lazy" />
            </div>

            <div className="text-details">
              <h3>{product.title}</h3>
              <small>${product.price}</small>
              <h4 id="new-price">
                ${Math.floor(
                  (product.price * (100 - discounts[index])) / 100,
                )}
              </h4>
            </div>
          </div>

          <div className="remaining-time">
            <p>Ends In: {formatTime(countdowns[index])}</p>
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
      "#limited-time-offers swiper-container",
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
    <section id="limited-time-offers">
      <div className="heading">
        <i className="fa fa-clock-o" aria-hidden="true"></i>
        <h4>Limited Time Offers</h4>
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
    </section>
  );
}
