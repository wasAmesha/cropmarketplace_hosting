import http from "./httpService";

const endpoint = "/api/v1/offer";

export async function AddNewOffer(offer) {
  return await http.post(endpoint + "/addNewOffer", offer);
}

export async function GetOffersBySender(id) {
  return await http.get(endpoint + `/getSenderOffers/${id}`);
}

export async function GetOffersByReceiver(id) {
  return await http.get(endpoint + `/getReceiverOffers/${id}`);
}

export async function UpdateOfferStatus(offer) {
  return await http.put(endpoint + "/updateOffer", offer);
}
