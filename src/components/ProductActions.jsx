// dependencies
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// contexts
import { UserContext } from "../contexts/userContext";

export default function ProductActions() {
  const { userAccount, setUserAccount } = useContext(UserContext);
  const navigate = useNavigate();

  function handleHeartClick() {
    if (!userAccount.logged) {
      navigate("/login");
    } else {
      console.log("clicked!");
    }
  }

  function handleAddToCartClick() {
    if (!userAccount.logged) {
      navigate("/login");
    } else {
      console.log("clicked!");
    }
  }

  return (
    <div className="actions">
      <a onClick={handleHeartClick}>
        <i className="fa fa-heart"></i>
      </a>

      <a onClick={handleAddToCartClick}>
        <i className="fa fa-cart-plus"></i>
      </a>
    </div>
  );
}
