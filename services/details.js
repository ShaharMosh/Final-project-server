import User from "../models/user.js";
import jwt from "jsonwebtoken";

const checkEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "" || emailRegex.test(email) === false) {
    return false;
  }
  return true;
};

const isValidDetails = (email, firstName, lastName) => {
  const errorList = [];
  if (!checkEmail(email)) {
    errorList.push("email");
  }

  if (firstName === "") {
    errorList.push("first name");
  }
  if (lastName === "") {
    errorList.push("last name");
  }
  return errorList.join(", ");
};

const isExist = async (oldEmail) => {
  try {
    const doc = await User.findOne({ oldEmail });
    if (doc) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

const updateUser = async (req, oldEmail, authorization) => {
  // Check if authorization header exists
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return null;
  }

  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.KEY);

  const email = req.body.oldEmail;

  const result = await User.updateOne(
    { email: oldEmail }, // Search for the user with the old email
    {
      $set: {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
    }
  );
};

export default {
  updateUser,
  isValidDetails,
  isExist,
};
