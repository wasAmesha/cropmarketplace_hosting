import { validationResult } from "express-validator";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export async function registerUser(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userRole, firstName, lastName, email, district, password } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }
    const user = new User({
      userRole,
      firstName,
      lastName,
      email,
      district,
      password: hashedPassword,
    });

    await user.save();
    res.status(200).send("User successfully registered");
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function login(req, res) {
  try {
    const { userRole, email, password } = req.body;
    const user = await User.findOne({ email: email, userRole: userRole });

    if (!user) return res.status(400).send("Invalid email or password");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).send("Invalid email or password");
    if(!user.isActive){
      return res.status(400).send("Your account is deactivated");
    }

    const token = user.generateAuthToken();

    res.header("x-auth-token", token);
    res.status(200).send(token);
  } catch (error) {
     res.status(500).send(error);
  }
}

export async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).send("No user found");
    delete user.password;

    res.status(200).send(user);

  } catch (error) {
     res.status(500).send(error);
  }
}

export async function getAllUsers(req, res){
  try {
    const users = await User.find();
    const filteredUsers = users.filter(user => user.userRole !== "Admin" );
    res.status(200).send(filteredUsers)
  } catch (error) {
     res.status(500).send(error);
  }
}

export async function updateUserState(req, res){
  try {
    const user = await User.findById(req.params.id);
    await User.findByIdAndUpdate(req.params.id,{isActive:!user.isActive});
    res.status(200).send("Updated Successfully")
  } catch (error) {
     res.status(500).send(error);
  }
}

export async function deleteUser(req,res){
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).send("Deleted Successfully");
  } catch (error) {
     res.status(500).send(error);
  }
}