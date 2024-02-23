import user from "../models/user.js";

const errorMessage = async (email) => {
    console.log("enter error");
    const errorList = [];
  
    try {
      const emailExists = await isEmailExist(email);
  
      console.log(emailExists);
  
      if (!emailExists) {
        console.log("serviserror: not email");
        errorList.push("email not registered");
      } else {
        console.log("serviserror: yes email");
      }
  
      console.log(errorList);
      return errorList.join(", ");
    } catch (err) {
      console.log("Error in errorMessage:", err);
      return "An error occurred";
    }
  };

const isEmailExist = async (email) => {
  try {
    console.log("servis: ", email);
    const doc = await user.findOne({ email });
    if (doc) {
      console.log("servis: yes email");
      return true;
    } else {
      console.log("servis: no email");
      return false;
    }
  } catch (err) {
    console.log("servis: error", err);
    return false;
  }
};

export default {
  errorMessage,
  isEmailExist,
};
