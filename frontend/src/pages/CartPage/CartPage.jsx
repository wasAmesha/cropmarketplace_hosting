import React, { useEffect, useState } from "react";
import "./CartPage.css";
import { Button, IconButton } from "@mui/material";
import { DeleteCartById, GetCartByUser } from "../../services/cartService";
import { getCurrentUser } from "../../services/userService";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

export default function CartPage({ setCartCount }) {
  const [cartItems, setCartItems] = useState([]);
  const user = getCurrentUser();
  const [loading, setLoading] = useState(true);
  const [tot, setTot] = useState(0);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    await GetCartByUser(user._id)
      .then(({ data }) => {
        let total = 0;
        setCartItems(data);
        setCartCount([...data].length);
        [...data].forEach((item) => {
          total = total + item.price * item.quantity;
        });
        setTot(total);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemoveCartItems = async (id) => {
    await DeleteCartById(id)
      .then(({ data }) => {
        fetchCartItems();
      })
      .catch((err) => toast.error(err.response.data));
  };

  return (
    <div style={{ margin: "2rem", marginTop: "15vh", display: "flex" }}>
      <div className="cartItems-section">
        {cartItems.length !==0?  cartItems.map((item) => (
          <div className="cartItem">
            <img src={item.product.productImage} alt="" />
            <h4>{item.product.productName}</h4>
            <div className="price">
              <h5>Price</h5>
              <div>
                {item.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "LKR",
                })}
              </div>
            </div>
            <div className="quantity">
              <h5>Quantity</h5>
              <div> {item.quantity}</div>
            </div>
            <div className="total">
              <h5>Total Price</h5>
              <div>
                {(item.price * item.quantity).toLocaleString("en-US", {
                  style: "currency",
                  currency: "LKR",
                })}
              </div>
            </div>
            <div className="action">
              <IconButton onClick={() => handleRemoveCartItems(item._id)}>
                <RemoveCircleIcon fontSize="large" color="error" />
              </IconButton>
            </div>
          </div>
        )):<div><center><h3>No items in cart</h3></center></div>}
      </div>
      <div className="cartSummery-section">
        <div>
          <center>
            <h5>
              <b>Cart Summary</b>
            </h5>
            <hr />
          </center>
        </div>
        <div>
          {cartItems.map((item) => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <tr>
                <td style={{ width: "7rem" }}>{item.product.productName}</td>
              </tr>
              <tr>
                <td>
                  {item.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "LKR",
                  })}{" "}
                  x {item.quantity}
                </td>
              </tr>
              <tr>
                <td>
                  {(item.price * item.quantity).toLocaleString("en-US", {
                    style: "currency",
                    currency: "LKR",
                  })}
                </td>
              </tr>
            </div>
          ))}
        </div>
        <div>
          <hr />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <span style={{ marginRight: "1rem" }}>
              <h5>
                <b>Total Amount: </b>
              </h5>
            </span>
            <span>
              {tot.toLocaleString("en-US", {
                style: "currency",
                currency: "LKR",
              })}
            </span>
          </div>
        </div>
        <br />
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={() => (window.location = "/payment")}
          disabled={cartItems.length === 0}
        >
          Checkout
        </Button>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
