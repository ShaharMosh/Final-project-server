import detailsService from "../services/details.js";

const updateUser = async (req, res) => {
  const exist = await detailsService.isExist(req.body.oldEmail);

  const error = detailsService.isValidDetails(
    req.body.email,
    req.body.firstName,
    req.body.lastName
  );
  if (error === "" && !exist) {
    const updateUser = await detailsService.updateUser(
      req,
      req.body.oldEmail,
      req.headers.authorization
    );
    res.json(updateUser);
  } else if (exist) {
    res.status(409).json({ error: "Email already exists" });
  } else {
    res.status(400).json({ error });
  }
};

export { updateUser };
