import emailService from "../services/email.js";

const checkEmail = async (req, res) => {
  console.log("control:", req.body.email);

  try {
    const error = await emailService.errorMessage(req.body.email);
    console.log("error", error);

    if (error === "") {
      console.log("control1: yes");
      res.json(req.body.email);
    } else {
      console.log("control2:", error);
      res.status(409).json({ error: "Email not found" });
    }
  } catch (err) {
    console.error("Error in checkEmail:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { checkEmail };