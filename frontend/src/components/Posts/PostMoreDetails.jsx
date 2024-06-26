import React, { useState } from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { IconButton, TextField, Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { format } from "date-fns";
import { getCurrentUser } from "../../services/userService";
import { AddToCart } from "../../services/cartService";
import { toast } from "react-toastify";
import { AddNewOffer } from "../../services/offerService";

export default function PostMoreDetails({ post, onClose }) {
  const [qty, setQty] = useState(1);
  const user = getCurrentUser();
  const [offerSending, setOfferSending] = useState(false);
  const [note, setNote] = useState("");
  const handleAddToCart = async () => {
    const cart = {
      postId: post._id,
      productId: post.product._id,
      userId: user._id,
      quantity: qty,
      price: post.price,
    };
    await AddToCart(cart)
      .then(({ data }) => {
        toast.success(data);
        onClose();
        setTimeout(() => {
          window.location = "/cart";
        }, 500);
      })
      .catch((err) => toast.error(err.response.data));
  };

  const handleQty = (e) => {
    if (e.target.value > post.quantity) {
      return toast.error("Cannot exceed maximum quantity");
    }
    if (e.target.value < 1) {
      return toast.error("Minimum quantity must be greater than 1KG");
    }
    setQty(e.target.value);
  };

  const handleSendOffer = async () => {
    const offer = {
      senderId: user._id,
      receiverId: post.userId,
      postId: post._id,
      note: note,
    };
    await AddNewOffer(offer)
      .then(({ data }) => {
        toast.success(data);
        onClose();
      })
      .catch((err) => toast.error(err.response.data));
  };

  if (!offerSending) {
    return (
      <div>
        <CardMedia
          component="img"
          alt={
            post.type === "Delivery"
              ? post.vehicleModelName
              : post.product.productName
          }
          height="200"
          image={
            post.type === "Delivery"
              ? post.vehicleImage
              : post.product.productImage
          }
        />
        <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Typography gutterBottom>
              <b>
                {post.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "LKR",
                })}
              </b>
              <span style={{ fontSize: "13px" }}>
                {post.type === "Delivery" ? " (per KM)" : " (per KG)"}
              </span>
            </Typography>
            <br />
            <Typography variant="body2" color="text.secondary">
              <h5>
                <b>Item Details</b>
              </h5>
              <hr />
              {post.type !== "Delivery" ? (
                <tr>
                  <td>
                    <b>Quantity</b>
                  </td>
                  <td>{post.quantity} KG</td>
                </tr>
              ) : (
                <tr>
                  <td>
                    <b>Max Capacity</b>
                  </td>
                  <td>{post.vehicleCapacity} KG</td>
                </tr>
              )}

              <tr>
                <td>
                  <b>District</b>
                </td>
                <td>
                  {post.district.charAt(0).toUpperCase() +
                    post.district.slice(1)}
                </td>
              </tr>
              <tr>
                <td style={{ width: "6.5rem" }}>
                  <b>Posted Date</b>
                </td>
                <td>{format(post.postedDate, "yyyy-MM-dd")}</td>
              </tr>
              <tr>
                <td>
                  <b>Expires Date</b>
                </td>
                <td>{post.expireDate}</td>
              </tr>
            </Typography>
            <br />
            <Typography variant="body2" color="text.secondary">
              <h5>
                <b>Contact Details</b>
              </h5>
              <hr />
              <tr>
                <td>
                  <b>Company</b>
                </td>
                <td>{post.company ? post.company : "Not available"}</td>
              </tr>
              <tr>
                <td>
                  <b>Email</b>
                </td>
                <td>{post.email ? post.email : "Not available"}</td>
              </tr>
              <tr>
                <td>
                  <b>Address</b>
                </td>
                <td>{post.address ? post.address : "Not available"}</td>
              </tr>
              <tr>
                <td style={{ width: "7.5rem" }}>
                  <b>Mobile Number</b>
                </td>
                <td>{post.mobile ? post.mobile : "Not available"}</td>
              </tr>
            </Typography>
          </div>
          {post.type === "Farmer" && user.role !== "Deliveryman" && (
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  variant="outlined"
                  sx={{ width: "auto", height: "2rem" }}
                  onClick={() => setQty(qty - 1)}
                  disabled={qty <= 1}
                >
                  -
                </IconButton>
                <input
                  style={{
                    border: "1px solid",
                    height: "2rem",
                    width: "5rem",
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: ".5rem",
                    paddingRight: ".5rem",
                    textAlign: "center",
                  }}
                  type="number"
                  value={qty}
                  onChange={handleQty}
                />
                <IconButton
                  variant="outlined"
                  sx={{ width: "auto", height: "2rem" }}
                  onClick={() => setQty(qty + 1)}
                  disabled={qty === post.quantity}
                >
                  +
                </IconButton>
              </div>
              <br />
              <Button
                size="small"
                variant="contained"
                color="success"
                fullWidth
                startIcon={<AddShoppingCartIcon />}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </div>
          )}
          {post.type === "Seller" && user.role === "Farmer" && (
            <div style={{ marginTop: "3rem" }}>
              <Button
                variant="contained"
                color="success"
                onClick={() => setOfferSending(!offerSending)}
              >
                Send Offer
              </Button>
            </div>
          )}
        </CardContent>
      </div>
    );
  }
  return (
    <div style={{ padding: "1rem" }}>
      <TextField
        value={note}
        onChange={(e) => {
          setNote(e.target.value);
        }}
        multiline
        rows={4}
        fullWidth
        label="Special Note"
        placeholder="Send a special note for the seller."
        InputLabelProps={{ shrink: true }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "2rem",
        }}
      >
        <Button variant="contained" color="success" onClick={handleSendOffer}>
          Send Offer
        </Button>
      </div>
    </div>
  );
}
