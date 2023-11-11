// css
import "../styles/recommendedbrands.css";

export default function RecommendedBrands() {
  return (
    <section id="recommended-brands">
      <div className="heading">
        <i className="fa fa-thumbs-up" aria-hidden="true"></i>
        <h4>
          Recommended Brands
        </h4>
      </div>

      <ul className="brands">
        <li>
          <img
            src="./razer-logo.png"
            alt="Razer Logo"
            width="793"
            height="793"
            loading="lazy"
          />
          <h5>Razer</h5>
          <a href="">
            Show Products{" "}
            <i className="fa fa-angle-right" aria-hidden="true"></i>
          </a>
        </li>

        <li>
          <img
            src="./nintendo-logo.png"
            alt="Nintendo Logo"
            width="1433"
            height="757"
            loading="lazy"
          />
          <h5>Nintendo</h5>
          <a href="">
            Show Products{" "}
            <i className="fa fa-angle-right" aria-hidden="true"></i>
          </a>
        </li>

        <li>
          <img
            src="./hyperx-logo.jpg"
            alt="HyperX Logo"
            width="728"
            height="410"
            loading="lazy"
          />
          <h5>HyperX</h5>
          <a href="">
            Show Products{" "}
            <i className="fa fa-angle-right" aria-hidden="true"></i>
          </a>
        </li>

        <li>
          <img
            src="./kingston-logo.jpg"
            alt="Kingston Logo"
            width="500"
            height="281"
            loading="lazy"
          />
          <h5>Kingston</h5>
          <a href="">
            Show Products{" "}
            <i className="fa fa-angle-right" aria-hidden="true"></i>
          </a>
        </li>
      </ul>
    </section>
  );
}
