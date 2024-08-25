import emailService from "../services/email.js";
import createTransporter from "../emailConfig.js";
import Email from "../models/email.js";

const checkEmail = async (req, res) => {
  // Function to generate a random reset token
  const generateResetToken = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  try {
    const error = await emailService.errorMessage(req.body.email);
    let resetToken;
    if (error === "") {
      // Check if email exists in the Email schema
      const existingEmail = await Email.findOne({ email: req.body.email });

      if (existingEmail) {
        // Email exists, update token and expiration
        resetToken = generateResetToken();
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 1);

        existingEmail.token = resetToken;
        existingEmail.expiresAt = expirationDate;

        await existingEmail.save();
      } else {
        // Email doesn't exist, create a new entry
        resetToken = generateResetToken();
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 1);

        const emailDocument = new Email({
          email: req.body.email,
          token: resetToken,
          expiresAt: expirationDate,
        });
        await emailDocument.save();
      }

      // Send email
      const transporter = createTransporter();
      const mailOptions = {
        from: "lookMattcher@gmail.com",
        to: req.body.email,
        subject: "Password Reset Request",
        text: `This is your token for password reset: ${resetToken}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          console.log("Email sent:", info.response);
          res.json(req.body.email);
        }
      });
    } else {
      res.status(409).json({ error: "Email not found" });
    }
  } catch (err) {
    console.error("Error in checkEmail:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { checkEmail };
