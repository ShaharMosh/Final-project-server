import userRegister from "../models/userRegister.js";
import jwt from "jsonwebtoken";

let userId;

const isLogin = async (email, password) => {
  // Validate the username and password against the User model
  const user = await userRegister.findOne({ email, password });
  if (!user) {
    return null;
  }
  const name = user.firstName;

  userId = user._id;

  // Generate a token
  const token = jwt.sign({ userId: user._id }, process.env.KEY, {
    expiresIn: "1h",
  });

  return { name, token };
};

const getUserId = () => {
  return userId;
};

export default {
  isLogin,
  getUserId,
};
