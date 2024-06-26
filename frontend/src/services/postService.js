import http from "./httpService";

const endpoint = "/api/v1/post";

export async function AddNewPost(post) {
  return await http.post(endpoint + "/addNewPost", post);
}

export async function GetPostsByUser(userId) {
  return await http.get(endpoint + `/getUserPosts/${userId}`);
}

export async function GetAllPosts() {
  return await http.get(endpoint + "/getAllPosts");
}

export async function GetPostById(postId) {
  return await http.get(endpoint + `/getPostById/${postId}`);
}

export async function UpdatedPostById(postId, post) {
  return await http.put(endpoint + `/updatePost/${postId}`, post);
}

export async function DeletePostById(postId){
    return await http.delete(endpoint + `/deletePost/${postId}`);
}