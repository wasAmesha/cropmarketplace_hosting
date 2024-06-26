import React, { useEffect, useState } from "react";
import "./PaymentPage.css";
import { getCurrentUser } from "../../services/userService";
import { Button } from "@mui/material";
import { GetCartByUser } from "../../services/cartService";
import PaymentForm from "./PaymentForm";
import { AddNewPayment } from "../../services/paymentService";
import { toast } from "react-toastify";

export default function PaymentPage() {
  const [cartItems, setCartItems] = useState([]);
  const [tot, setTot] = useState(0);
  const user = getCurrentUser();
  const [loading, setLoading] = useState(true);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [totalDeliveryFee, setTotalDeliveryFee] = useState(0);
  const [payment, setPayment] = useState({});

  const fetchCartItems = async () => {
    await GetCartByUser(user._id)
      .then(({ data }) => {
        let total = 0;
        setCartItems(data);
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

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleSaveDetails = (fee, deliveryData, deliveryId) => {
    const payment = {
      buyerId: user._id,
      deliveryId: deliveryId,
      cartItems: cartItems,
      deliveryDetails: deliveryData,
      paymentDetails: {
        deliveryFee: fee,
        totalDeliveryFee: fee * cartItems.length,
        totalAmount: tot + fee * cartItems.length,
      },
      deliveryStatus: [{ date: new Date().toISOString(), status: "Pending" }],
    };
    setPayment(payment);
    setDeliveryFee(fee);
    setTotalDeliveryFee(fee * cartItems.length);
    setTot(tot + fee * cartItems.length);
  };

  const handlePayment = async () => {
    await AddNewPayment(payment)
      .then(({ data }) => {
        toast.success(data);
        setTimeout(() => {
          window.location = "/home";
        }, 500);
      })
      .catch((err) => toast.error(err.response.data));
  };

  return (
    <div style={{ margin: "2rem", marginTop: "15vh", display: "flex" }}>
      <div className="billing-details">
        <PaymentForm handleSaveDetails={handleSaveDetails} />
      </div>
      <div className="payment-summary">
        <div>
          <center>
            <h5>
              <b>Payment Summary</b>
            </h5>
            <hr />
          </center>
        </div>
        <div style={{overflowY:'auto', maxHeight: '50vh',}} >
          {cartItems.map((item) => (
            <>
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
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <span style={{ marginRight: "1rem" }}>
                    <h6>
                      <b>Delivery Fee: </b>
                    </h6>
                  </span>
                  <span>
                    {deliveryFee.toLocaleString("en-US", {
                      style: "currency",
                      currency: "LKR",
                    })}
                  </span>
                </div>
              </div>
              <hr />
            </>
          ))}
        </div>
        <br />
        <br />
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <span style={{ marginRight: "1rem" }}>
              <h6>
                <b>Total Delivery Fee: </b>
              </h6>
            </span>
            <span>
              {totalDeliveryFee.toLocaleString("en-US", {
                style: "currency",
                currency: "LKR",
              })}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <span style={{ marginRight: "1rem" }}>
              <h6>
                <b>Total Amount: </b>
              </h6>
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
          disabled={deliveryFee === 0}
          onClick={handlePayment}
        >
          Pay Now
        </Button>
      </div>
    </div>
  );
}
