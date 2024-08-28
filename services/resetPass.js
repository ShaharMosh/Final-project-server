import userToken from "../models/email.js";
import userModel from "../models/user.js";

const isToken = async (email, token) => {
  try {
    // Validate the email model
    const user = await userToken.findOne({ email });

    if (!user) {
      return false;
    }

    // Check if the provided token matches the stored token
    if (user.token !== token) {
      return false;
    }

    const expiration = user.expiresAt;

    // Check if the token is not expired
    const currentDate = new Date();
    if (currentDate < expiration) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error("Failed to validate token");
  }
};

const checkPassword = (password) => {
  if (/^[A-Za-z0-9]*$/.test(password) === true && password.length >= 8) {
    return true;
  }
  return false;
};

const isValidPassword = (newPassword) => {
  const errorList = [];
  if (!checkPassword(newPassword)) {
    errorList.push("new password");
  }
  console.log(errorList);

  return errorList.join(", ");
};

const updatePassword = async (email, newPassword) => {
  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      { $set: { password: newPassword } },
      { new: true }
    );

    return updatedUser;
  } catch (error) {
    console.error("Error in updatePassword:", error);
    throw new Error("Failed to update password");
  }
};

export default {
  isToken,
  isValidPassword,
  updatePassword,
};
