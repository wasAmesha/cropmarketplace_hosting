import http from "./httpService";

const endpoint = "/api/v1/payment";

export async function AddNewPayment(payment){
    return await http.post(endpoint + "/addNewPayment", payment);
}

export async function GetAllOrdersBySeller(id){
    return await http.get(endpoint + `/ordersBySeller/${id}`);
}

export async function GetAllOrdersByDeliveryman(id) {
  return await http.get(endpoint + `/ordersByDeliveryman/${id}`);
}
export async function GetAllOrdersByFarmer(id) {
  return await http.get(endpoint + `/ordersByFarmer/${id}`);
}

export async function UpdateOrderStatus(status){
    return await http.put(endpoint + "/updateOrderStatus", status);
}