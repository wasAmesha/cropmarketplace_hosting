import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/userService";
import { toast } from "react-toastify";
import PaymentForm from "./PaymentForm";
import { useParams } from "react-router-dom";
import { GetPostById } from "../../services/postService";
import { AddNewPayment } from "../../services/paymentService";

export default function OfferPaymentPage() {
  const [tot, setTot] = useState(0);
  const user = getCurrentUser();
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [payment, setPayment] = useState({});
  const { id, farmerId } = useParams();
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      await GetPostById(id)
        .then(({ data }) => {
          setPostData(data);
          setTot(data.price * data.quantity);
        })
        .catch((err) => {
          toast.error(err.response.data);
        });
    };
    fetchPaymentDetails();
  }, []);

  const handleSaveDetails = (fee, deliveryData, deliveryId) => {
    const payment = {
      buyerId: user._id,
      deliveryId: deliveryId,
      cartItems: null,
      postId: id,
      offeredFarmer: farmerId,
      deliveryDetails: deliveryData,
      paymentDetails: { deliveryFee: fee, totalAmount: tot + fee },
      deliveryStatus: [{ date: new Date().toISOString(), status: "Pending" }],
    };
    setPayment(payment);
    setDeliveryFee(fee);
    setTot(tot + fee);
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
        <div>
          {postData !== null && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <tr>
                <td style={{ width: "7rem" }}>
                  {postData.product.productName}
                </td>
              </tr>
              <tr>
                <td>
                  {postData.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "LKR",
                  })}{" "}
                  x {postData.quantity}
                </td>
              </tr>
              <tr>
                <td>
                  {(postData.price * postData.quantity).toLocaleString(
                    "en-US",
                    {
                      style: "currency",
                      currency: "LKR",
                    }
                  )}
                </td>
              </tr>
            </div>
          )}
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
