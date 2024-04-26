import nodemailer from "nodemailer";

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "lookMattcher@gmail.com",
      pass: "scly elrx kcec wwht",
    },
  });
};

export default createTransporter;
