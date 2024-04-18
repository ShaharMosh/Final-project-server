import User from "../models/user.js";
import jwt from 'jsonwebtoken'

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
  //   if (!checkPassword(password)) {
  //     errorList.push("password");
  //   }
  //   if(!CheckConfirmPassword(password, confirmPassword)){
  //     errorList.push("confirm password");
  //   }
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

  //console.log("cservices2", authorization)
  // Check if authorization header exists
  if (!authorization || !authorization.startsWith('Bearer ')) {
    //console.log("cservices33")
    return null;
  }
  //console.log("cservices22")

  const token = authorization.split(' ')[1];
  jwt.verify(token, process.env.KEY);
  
  const email = req.body.oldEmail;

  // const user = await User.findOne({ email });
  // console.log("user", user);
  // console.log("email", email)
  // console.log("newemail", req.body.email)
  // //console.log("email", user.email)
  // if (user) {
  //   console.log("okkk")
  // }

  const result = await User.updateOne(
    { email: oldEmail }, // Search for the user with the old email
    { $set: { email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName, } }
  );
  //console.log("cservices3")
};

export default {
  updateUser,
  isValidDetails,
  isExist,
};
