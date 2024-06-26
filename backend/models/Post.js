import mongoose from "mongoose";

const Post = new mongoose.Schema({
  productId: {
    type: mongoose.Types.ObjectId,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  quantity: {
    type: Number,
  },
  vehicleModelName: { type: String },
  vehicleCapacity: { type: Number },
  vehicleImage: { type: String },

  price: {
    type: Number,
    require: true,
  },
  district: {
    type: String,
    require: true,
  },
  company: {
    type: String,
    require: false,
  },
  mobile: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: false,
  },
  address: {
    type: String,
    require: true,
  },
  postedDate: {
    type: Date,
    default: Date.now(),
  },
  expireDate: {
    type: String,
    required: true,
  },
});
export default mongoose.model("Post", Post);
