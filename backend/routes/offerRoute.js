import express from "express";
import {
  AddNewOffer,
  GetOfferByReceiver,
  GetOfferBySender,
  UpdateOfferStatus,
} from "../controllers/offerController.js";

const router = express.Router();

router.post("/addNewOffer", AddNewOffer);
router.get("/getSenderOffers/:senderId", GetOfferBySender);
router.get("/getReceiverOffers/:receiverId", GetOfferByReceiver);
router.put("/updateOffer", UpdateOfferStatus);

export default router;
