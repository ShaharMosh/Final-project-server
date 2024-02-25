import userToken from "../services/resetPass.js";

const checkToken = async (req, res) => {
  const result = await userToken.isToken(req.body.email, req.body.token);

  const error = userToken.isValidPassword(req.body.newPassword);

  if (error === "" && result) {
    const updatePasswordResult = await userToken.updatePassword(
      req.body.email,
      req.body.newPassword
    );

    res.json(updatePasswordResult);
  } else {
    res.status(409).json({ error: "Invalid token or new password" });
  }
};

export { checkToken };
