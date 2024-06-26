import React from "react";
import { Link } from "react-router-dom";
import "./Categories.css";

function Categories() {
  return (
    <div>
      <div className="image-row">
        <Link to="/vegetable">
          <img
            src={"/Categories/veg.png"}
            alt="Vegetable"
            className="image"
          />
        </Link>
        <Link to="/fruit">
          <img
            src={"/Categories/fruit.png"}
            alt="Fruit"
            className="image"
          />
        </Link>
        <Link to="/grain">
          <img
            src={"/Categories/grain.png"}
            alt="Grain"
            className="image"
          />
        </Link>
        <Link to="/spices">
          <img
            src={"/Categories/spices.png"}
            alt="Spices"
            className="image"
          />
        </Link>
        <Link to="/other">
          <img
            src={"/Categories/other.png"}
            alt="Other"
            className="image"
          />
        </Link>
      </div>
    </div>
  );
}

export default Categories;
