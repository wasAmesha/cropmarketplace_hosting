import Offer from "../models/Offer.js";
import User from "../models/User.js";

export async function AddNewOffer(req, res) {
  try {

    const offers = await Offer.find({postId:req.body.postId, senderId:req.body.senderId})
    if(offers.length > 0) {
      return res.status(400).send("You have already sent an offer")
    }
    const newOffer = new Offer({ ...req.body });
    await newOffer.save();

    res.status(200).send("Offer sent successfully");
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function GetOfferByReceiver(req, res) {
  try {
    const offers = await Offer.find({ receiverId: req.params.receiverId });
    const offersWithDate = await Promise.all(
      offers.map(async (offer) => {
        const sender = await User.findById(offer.senderId);
        const offerData = offer.toObject();
        return { ...offerData, sender: sender };
      })
    );
    res.status(200).send(offersWithDate);
  } catch (error) {
    res.status(500).send(error);
  }
}
export async function GetOfferBySender(req, res) {
  try {
    const offers = await Offer.find({ senderId: req.params.senderId });
    const offersWithDate = await Promise.all(
      offers.map(async (offer) => {
        const receiver = await User.findById(offer.receiverId);
        const offerData = offer.toObject();
        return { ...offerData, receiver: receiver };
      })
    );
    res.status(200).send(offersWithDate);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function UpdateOfferStatus(req, res) {
  try {
    await Offer.findByIdAndUpdate(req.body.id, { status: req.body.status });
    res.status(200).send("Offer status Updated");
  } catch (error) {
    res.status(500).send(error);
  }
}
