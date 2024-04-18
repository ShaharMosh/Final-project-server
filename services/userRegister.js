import userRegister from "../models/userRegister.js";

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

const isValidUser = (email, firstName, lastName, password, confirmPassword) => {
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
  if (!checkPassword(password)) {
    errorList.push("password");
  }
  if(!CheckConfirmPassword(password, confirmPassword)){
    errorList.push("confirm password");
  }

  return errorList.join(", ");
};

const isExist = async (email) => {
  try {
    const doc = await userRegister.findOne({ email });
    if (doc) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

const createUser = async (email, firstName, lastName, password) => {
  const user = await userRegister.create({
    email: email,
    firstName: firstName,
    lastName: lastName,
    password: password,
  });
};

export default {
  createUser,
  isValidUser,
  isExist,
};
