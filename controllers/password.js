import passwordService from "../services/password.js";

const updatePassword = async (req, res) => {
  try {
    const error = await passwordService.isValidPassword(
      req.body.currPassword,
      req.body.newPassword,
      req.body.confirmPassword,
      req.headers.authorization
    );

    if (error === "") {
      const updatePasswordResult = await passwordService.updatePassword(
        req,
        req.body.newPassword,
        req.headers.authorization
      );
      res.json(updatePasswordResult);
    } else {
      res.status(400).json({ error });
    }
  } catch (err) {
    console.error("Error in updatePassword:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { updatePassword };
