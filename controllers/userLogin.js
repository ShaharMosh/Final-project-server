import userLogin from "../services/userLogin.js";

const login = async (req, res) => {
  const loginResult = await userLogin.isLogin(
    req.body.email,
    req.body.password
  );

  if (loginResult !== null) {
    const { name, token } = loginResult;
    res.json({ name, token });
  } else {
    res.status(404).json({ error: "Invalid email or password" });
  }
};

export { login };
