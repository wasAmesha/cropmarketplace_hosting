import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  deliveryId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  cartItems: {
    type: [{ type: mongoose.Schema.Types.Mixed }],
  },
  postId: { type: mongoose.Types.ObjectId, default: null },
  offeredFarmer: { type: mongoose.Types.ObjectId, default: null },
  deliveryDetails: {
    type: mongoose.Schema.Types.Mixed,
  },
  paymentDetails: {
    type: mongoose.Schema.Types.Mixed,
  },
  deliveryStatus: {
    type: [{ type: mongoose.Schema.Types.Mixed }],
  },
});

export default mongoose.model("Payment", PaymentSchema);
