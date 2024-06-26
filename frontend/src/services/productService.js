import http from "./httpService";

const endpoint = "/api/v1/product";

export async function GetProductByCategory(category){
    return await http.get(endpoint + `/getProduct/${category}`);
}

export async function GetAllProducts(){
    return await http.get(endpoint + "/getAllProducts");
}

export async function AddNewProduct(product){
    return await http.post(endpoint + "/addNewPost", product);
}

export async function UpdateProduct(id,product){
    return await http.put(endpoint + `/updateProduct/${id}`, product);
}

export async function DeleteProduct(id){
    return await http.delete(endpoint + `/deleteProduct/${id}`);
}