import http from "./httpService";

const endpoint = "/api/v1/cart";

export async function AddToCart(cart) {
  return await http.post(endpoint + "/addToCart", cart);
}

export async function GetCartByUser(id) {
  return await http.get(endpoint + `/getUserCart/${id}`);
}

export async function UpdateCartById(cart) {
  return await http.put(endpoint + "/updateCart", cart);
}

export async function DeleteCartById(id) {
  return await http.delete(endpoint + `/deleteCart/${id}`);
}
