import React, { useState } from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PostForm from "./PostForm";
import { getCurrentUser } from "../../services/userService";
import { GetProductByCategory } from "../../services/productService";
import { toast } from "react-toastify";
import "./NewPostDialog.css";
export default function NewPostDialog({ onClose }) {
  const [categorySelected, setCategorySelected] = useState(null);
  const [itemSelected, setItemSelected] = useState(null);
  const [products, setProducts] = useState([]);
  const user = getCurrentUser();

  const handleCategorySelection = (category) => {
    setCategorySelected(category);
    fetchProducts(category);
  };

  const handleItemSelection = (item) => {
    setItemSelected(item);
  };

  const fetchProducts = async (category) => {
    await GetProductByCategory(category)
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((err) => toast.error(err.response.data));
  };

  return (
    <div
      style={
        user.role === "Deliveryman"
          ? {}
          : categorySelected === null || itemSelected === null
          ? { maxHeight: "55vh" }
          : {}
      }
    >
      {user.role !== "Deliveryman" && categorySelected === null && (
        <>
          <div>
            <br />
            <center>
              <h4>
                <b>
                  <span
                    style={{
                      padding: "0.4rem",
                      border: "1px solid",
                      borderRadius: "30px",
                    }}
                  >
                    1
                  </span>{" "}
                  First Select Item Category
                </b>
              </h4>
            </center>
            <br />
          </div>
          <div className="image-row" style={{ display: "flex" }}>
            <img
              src={"/Categories/veg.png"}
              alt="Vegetable"
              className="image"
              onClick={() => handleCategorySelection("Veg")}
            />
            <img
              src={"/Categories/fruit.png"}
              alt="Fruit"
              className="image"
              onClick={() => handleCategorySelection("Fruit")}
            />
            <img
              src={"/Categories/grain.png"}
              alt="Grain"
              className="image"
              onClick={() => handleCategorySelection("Grain")}
            />
            <img
              src={"/Categories/spices.png"}
              alt="Spices"
              className="image"
              onClick={() => handleCategorySelection("Spices")}
            />
            <img
              src={"/Categories/other.png"}
              alt="Other"
              className="image"
              onClick={() => handleCategorySelection("Other")}
            />
          </div>
        </>
      )}

      {user.role !== "Deliveryman" &&
        categorySelected !== null &&
        itemSelected === null && (
          <div>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => {
                setProducts([]);
                setCategorySelected(null);
              }}
            >
              Back
            </Button>
            <div>
              <br />
              <center>
                <h4>
                  <b>
                    <span
                      style={{
                        padding: "0.4rem",
                        border: "1px solid",
                        borderRadius: "30px",
                      }}
                    >
                      2
                    </span>{" "}
                    Select a Item
                  </b>
                </h4>
              </center>
              <br />
            </div>
            <div
              style={{ display: "flex", marginTop: "1rem", overflowX: "auto" }}
            >
              {products.length > 0 ? (
                products.map((product) => (
                  <div
                    className="products-item-veg"
                    key={product._id}
                    style={{
                      minWidth: "200px",
                      maxWidth: "150px",
                      maxHeight: "200px",
                      cursor: "pointer",
                      marginBottom: "1rem",
                    }}
                    onClick={() => {
                      handleItemSelection(product);
                    }}
                  >
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      style={{ maxHeight: "130px" }}
                    />
                    <p>{product.productName}</p>
                  </div>
                ))
              ) : (
                <p>No vegetable products found.</p>
              )}
            </div>
          </div>
        )}
      {user.role !== "Deliveryman" &&
        categorySelected !== null &&
        itemSelected !== null && (
          <>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => {
                setItemSelected(null);
              }}
            >
              Back
            </Button>
            <PostForm item={itemSelected} onClose={onClose} />
          </>
        )}
      {user.role === "Deliveryman" && (
        <PostForm item={itemSelected} onClose={onClose} />
      )}
    </div>
  );
}
