import React, {  } from "react";
import { getCurrentUser } from "../../services/userService";
import SellerOrders from "../Order/SellerOrders";
import DeliverymanOrders from "../Order/DeliverymanOrders";
import FarmerOrders from "../Order/FarmerOrders";

export default function OrdersSection() {
  const user = getCurrentUser();

  return (
    <div>
      {user.role === "Seller" && <SellerOrders />}
      {user.role === "Farmer" && <FarmerOrders />}
      {user.role === "Deliveryman" && <DeliverymanOrders />}
    </div>
  );
}