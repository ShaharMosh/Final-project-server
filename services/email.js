import user from "../models/user.js";

const errorMessage = async (email) => {
  const errorList = [];

  try {
    const emailExists = await isEmailExist(email);

    if (!emailExists) {
      errorList.push("email not registered");
    } else {
    }

    return errorList.join(", ");
  } catch (err) {
    return "An error occurred";
  }
};

const isEmailExist = async (email) => {
  try {
    const doc = await user.findOne({ email });
    if (doc) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

export default {
  errorMessage,
  isEmailExist,
};
