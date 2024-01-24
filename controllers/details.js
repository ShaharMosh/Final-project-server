import detailsService from "../services/details.js";

const updateUser = async (req, res) => {
    console.log("controllers111")
  const exist = await detailsService.isExist(req.body.oldEmail);
  const error = detailsService.isValidDetails(
    req.body.email,
    req.body.firstName,
    req.body.lastName,
  );
  console.log("controllers1")
  if (error === "" && !exist) {
    console.log("controllers2")
    const updateUser = await detailsService.updateUser(req, req.headers.authorization);
    res.json(updateUser);
  } else if (exist) {
    res.status(409).json({ error: "Email already exists" });
  } else {
    res.status(400).json({ error });
  }
};

export { updateUser };
