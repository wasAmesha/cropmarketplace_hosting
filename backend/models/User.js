import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import config from "config";

const userSchema = new mongoose.Schema({
  userRole: {
    type: String,
  },

  firstName: {
    type: String,
  },

  lastName: {
    type: String,
  },

  email: {
    type: String,
  },
  district: {
    type: String,
  },
  password: {
    type: String,
  },
  isActive:{
    type: Boolean,
    default: true,
  }
});

userSchema.methods.generateAuthToken = function () {
  const token = jsonwebtoken.sign(
    {
      _id: this.id,
      email: this.email,
      name: this.firstName + " " + this.lastName,
      role: this.userRole,
      district: this.district,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

export default mongoose.model("user", userSchema);
