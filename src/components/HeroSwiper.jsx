// dependencies
import { useEffect, useState } from "react";
import { register } from "swiper/element/bundle";

register();

// css
import "../styles/heroswiper.css";

export default function HeroSwiper() {
  const [enableNavigation, setEnableNavigation] = useState(false);

  function handleResize() {
    if (window.innerWidth >= 768) {
      setEnableNavigation(true);
    } else {
      setEnableNavigation(false);
    }
  }

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="hero-swiper-container">
      <section id="hero-swiper-section">
        <swiper-container
          loop="true"
          autoplay-delay="10000"
          navigation={enableNavigation}
          pagination="true"
        >
          <swiper-slide>
            <img
              src="./Slide-1.jpg"
              alt="Picture of a home office"
              width="1920"
              height="1281"
              loading="lazy"
            />
            <div className="content-container">
              <h3>Elevate Your Home Office Setup</h3>
              <a href="">
                Shop Office Essentials
              </a>
            </div>
          </swiper-slide>
          <swiper-slide>
            <img
              src="./Slide-2.jpg"
              alt="Picture of a shopping bags"
              width="1920"
              height="1280"
              loading="lazy"
            />
            <div className="content-container">
              <h3>Spread Joy with Thoughtful Gifts</h3>
              <a href="">
                Explore Gift Ideas
              </a>
            </div>
          </swiper-slide>
          <swiper-slide>
            <img
              src="./Slide-3.jpg"
              alt="Picture of a clothing store hangers"
              width="1920"
              height="1280"
              loading="lazy"
            />
            <div className="content-container">
              <h3>Your Wardrobe in Style</h3>
              <a href="">
                Discover Trendy Apparel
              </a>
            </div>
          </swiper-slide>
        </swiper-container>
      </section>
    </div>
  );
}
