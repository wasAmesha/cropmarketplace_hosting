import mongoose from "mongoose";

const OfferSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Types.ObjectId,
  },
  senderId: {
    type: mongoose.Types.ObjectId,
  },
  receiverId: { type: mongoose.Types.ObjectId },
  
  note: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  createdAt:{
    type: Date,
    default: new Date()
  }
});
export default mongoose.model("Offer", OfferSchema);
