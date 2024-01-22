import userService from "../services/userRegister.js";

const createUser = async (req, res) => {
  const exist = await userService.isExist(req.body.email);
  const error = userService.isValidUser(
    req.body.email,
    req.body.firstName,
    req.body.lastName,
    req.body.password,
    req.body.confirmPassword
  );

  if (error === "" && !exist) {
    
    const newUser = await userService.createUser(
      req.body.email,
      req.body.firstName,
      req.body.lastName,
      req.body.password
    );
    res.json(newUser);
  } else if (exist) {
    res.status(409).json({ error: "Email already exists" });
  } else {
    res.status(400).json({ error });
  }
};

export { createUser };
