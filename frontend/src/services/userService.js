import http from "./httpService";
import { jwtDecode } from "jwt-decode";

const endpoint = "/api/v1/user";

export async function LoginUser(user) {
  return await http.post(endpoint + "/login", user);
}

export async function RegisterUser(user) {
  return await http.post(endpoint + "/register", user);
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    localStorage.setItem("userId", user._id);
    return user;
  } catch (error) {
    return null;
  }
}

export async function GetAllUsers() {
  return await http.get(endpoint + "/getAllUsers");
}

export async function updateUserState(id){
  return await http.put(endpoint + `/updateUserStatus/${id}`, {});
}

export async function deleteUser(id) {
  return await http.delete(endpoint + `/deleteUser/${id}`);
}