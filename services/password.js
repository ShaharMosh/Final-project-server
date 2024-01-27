import userPassName from "../models/user.js";
import jwt from "jsonwebtoken";

const checkPassword = (password) => {
  if (/^[A-Za-z0-9]*$/.test(password) === true && password.length >= 8) {
    return true;
  }
  return false;
};

const CheckConfirmPassword = (password, confirmPassword) => {
  if (password === confirmPassword) {
    return true;
  }
  return false;
};

const CheckOldPassword = async (currPassword, authorization) => {
  // Check if authorization header exists
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return null;
  }

  const token = authorization.split(" ")[1];

  // Extract the token from the Authorization header
  const decodedToken = jwt.decode(token);

  if (!decodedToken || !decodedToken.userId) {
    return { error: "Invalid token" };
  }

  // Extract the user's ID from the decoded token
  const userId = decodedToken.userId;

  try {
    jwt.verify(token, process.env.KEY);

    // Assuming `userPassName` is a mongoose model
    const user = await userPassName.findById(userId);

    if (user) {
      // Compare oldPassword with the password from the database
      if (currPassword === user.password) {
        return { isMatch: true, user: user };
      } else {
        return { isMatch: false, error: "Old password does not match" };
      }
    } else {
      return { error: "User not found" };
    }
  } catch (err) {
    return { error: "Error verifying token" };
  }
};

const isValidPassword = async (
  currPassword,
  newPassword,
  confirmPassword,
  authorization
) => {
  const errorList = [];

  // Check if old password is valid
  const oldPasswordCheck = await CheckOldPassword(currPassword, authorization);

  if (!oldPasswordCheck || !oldPasswordCheck.isMatch) {
    errorList.push("current password");
  }

  // Check if new password is valid
  if (!checkPassword(newPassword)) {
    errorList.push("new password");
  }

  // Check if confirmPassword matches newPassword
  if (!CheckConfirmPassword(newPassword, confirmPassword)) {
    errorList.push("confirm password");
  }

  return errorList.join(", ");
};

const updatePassword = async (req, newPassword, authorization) => {
  // Check if authorization header exists
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return { error: "Invalid token" };
  }

  const token = authorization.split(" ")[1];

  // Extract the token from the Authorization header
  const decodedToken = jwt.decode(token);

  if (!decodedToken || !decodedToken.userId) {
    return { error: "Invalid token" };
  }

  // Extract the user's ID from the decoded token
  const userId = decodedToken.userId;

  try {
    jwt.verify(token, process.env.KEY);

    // Assuming `User` is a mongoose model
    const user = await userPassName.findById(userId);

    if (!user) {
      return { error: "User not found" };
    }

    // Update the user's password with the new password
    const result = await userPassName.findByIdAndUpdate(userId, {
      password: newPassword,
    });

    if (result) {
      return { success: true };
    } else {
      return { error: "Failed to update password" };
    }
  } catch (err) {
    return { error: "Error verifying token" };
  }
};

export default {
  updatePassword,
  isValidPassword,
};
