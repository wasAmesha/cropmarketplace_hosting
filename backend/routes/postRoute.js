import express from "express";
import {
  addNewPost,
  deletePostById,
  getAllPosts,
  getPostById,
  getPostsByUser,
  updatePost,
} from "../controllers/postController.js";
const router = express.Router();

router.post("/addNewPost", addNewPost);
router.get("/getUserPosts/:userId", getPostsByUser);
router.get("/getAllPosts", getAllPosts);
router.get("/getPostById/:postId", getPostById);
router.put("/updatePost/:id", updatePost);
router.delete("/deletePost/:id", deletePostById);

export default router;
