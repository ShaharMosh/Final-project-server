import userService from "../services/user.js";

const getDetails = async (req, res) => {
  const details = await userService.getDetails(req, req.headers.authorization);

  if (details !== null) {
    res.json({
      email: details.email,
      firstName: details.firstName,
      lastName: details.lastName,
      password: details.password,
    });
  } else {
    return res.status(404);
  }
};

const updateUserWishlist = async (req, res) => {
  const result = await userService.updateUserWishlist(
    req,
    req.headers.authorization
  );

  if (result.success) {
    res.json({ success: true, wishlist: result.wishlist });
  } else {
    res.status(500).json({ error: result.message });
  }
};

const getWishlist = async (req, res) => {
  const result = await userService.getUserWishlist(req.headers.authorization);

  if (result.success) {
    res.json({ success: true, wishlist: result.wishlist });
  } else {
    res.status(500).json({ error: result.message });
  }
};

const wishlistPage = async (req, res) => {
  const result = await userService.wishlistPage(req.headers.authorization);

  if (result.success) {
    res.json({ success: true, items: result.items });
  } else {
    res.status(500).json({ error: result.message });
  }
};

export default {
  getDetails,
  updateUserWishlist,
  getWishlist,
  wishlistPage,
};
