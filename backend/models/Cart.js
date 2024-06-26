import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Types.ObjectId,
  },
  productId: {
    type: mongoose.Types.ObjectId,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
});
export default mongoose.model("Cart", CartSchema);
