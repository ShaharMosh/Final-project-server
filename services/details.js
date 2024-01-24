import details from "../models/details.js";
import jwt from 'jsonwebtoken'
import { Types } from 'mongoose';


const checkPassword = (password) => {
  if (/^[A-Za-z0-9]*$/.test(password) === true && password.length >= 8) {
    return true;
  }
  return false;
};

const checkEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "" || emailRegex.test(email) === false) {
    return false;
  }
  return true;
};

const CheckConfirmPassword = (password ,confirmPassword) => {
  if (password === confirmPassword) {
    return true;
  }
  return false;
};

const isValidDetails = (email, firstName, lastName) => {
    console.log("cservices1")
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
  console.log(errorList);

  return errorList.join(", ");
};

const isExist = async (email) => {
  try {
    const doc = await details.findOne({ email });
    if (doc) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

const updateUser = async (req, authorization) => {
   
    console.log("cservices2", authorization)
    // Check if authorization header exists
    if (!authorization || !authorization.startsWith('Bearer ')) {
        console.log("cservices33")
        return null;
    }
    console.log("cservices22")

    const token = authorization.split(' ')[1];
   
    const email = req.body.oldEmail;

    console.log("email1", email)
    jwt.verify(token, process.env.KEY);
    const user = await details.findById(email);
    console.log("email", email)
    console.log("newemail", req.body.email)
    //console.log("email", user.email)
    if (user) {
        console.log("okkk")
    }

    const result = await details.updateOne(
        { email: user.email }, // Search for the user with the old email
        { $set: { email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName, } } 
        );
        console.log("cservices3")
    };

export default {
  updateUser,
  isValidDetails,
  isExist,
};
