import React from "react";

export default function OrderDetails({ order }) {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <img
          src={order.product.productImage}
          alt=""
          style={{ width: "200px" }}
        />
        <div style={{ marginLeft: "2rem" }}>
          <h5>
            <b>{order.product.productName}</b>
          </h5>
          <tr>
            <td>
              <b>Quantity</b>
            </td>
            <td>{order.qty}</td>
          </tr>
          <tr>
            <td>
              <b>Delivery Fee</b>
            </td>
            <td>{order.deliveryFee}</td>
          </tr>
          <tr>
            <td style={{ width: "8rem" }}>
              <b>Total Amount</b>
            </td>
            <td>{order.totalAmount}</td>
          </tr>
        </div>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <h5>
          <b>Customer Details</b>
        </h5>
        <hr />
        <div>
          <tr>
            <td>
              <b>Name</b>
            </td>
            <td>
              {order.deliveryDetails.firstName +
                " " +
                order.deliveryDetails.lastName}
            </td>
          </tr>
          <tr>
            <td>
              <b>Address</b>
            </td>
            <td>{order.deliveryDetails.address}</td>
          </tr>
          <tr>
            <td>
              <b>City</b>
            </td>
            <td>{order.deliveryDetails.city}</td>
          </tr>
          <tr>
            <td>
              <b>Postal Code</b>
            </td>
            <td>{order.deliveryDetails.postalCode}</td>
          </tr>
          <tr>
            <td style={{ width: "9rem" }}>
              <b>Phone Number</b>
            </td>
            <td>{order.deliveryDetails.phone}</td>
          </tr>
        </div>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <h5>
          <b>Delivery Details</b>
        </h5>
        <hr />
        <div>
          <tr>
            <td>
              <b>From</b>
            </td>
            <td>{order.deliveryDetails.fromLocation}</td>
          </tr>
          <tr>
            <td style={{ width: "6rem" }}>
              <b>Address</b>
            </td>
            <td>{order.deliveryDetails.toLocation}</td>
          </tr>
          <tr>
            <td>
              <b>City</b>
            </td>
            <td>{order.deliveryDetails.distance} Km</td>
          </tr>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}
