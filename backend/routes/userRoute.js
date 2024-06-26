import express from "express";
import { body } from "express-validator";
import { deleteUser, getAllUsers, login, registerUser, updateUserState } from "../controllers/userController.js";
const router  = express.Router();

router.post("/register", [
  body("userRole").notEmpty().withMessage("User role is required"),
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("district").notEmpty().withMessage("District is required"),
], registerUser);
router.post("/login", login);
router.get("/getAllUsers", getAllUsers)
router.put("/updateUserStatus/:id", updateUserState);
router.delete("/deleteUser/:id", deleteUser);



export default router;