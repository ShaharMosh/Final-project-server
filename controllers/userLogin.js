import userLogin from "../services/userLogin.js";

const login = async (req, res) => {
  const token = await userLogin.isLogin(req.body.email, req.body.password);

  if (token !== null) {
    res.json({ token });
  } else {
    res.status(404).json({ error: "Invalid email or password" });
  }
};

export { login };
