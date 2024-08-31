import StoreService from "../services/addresses.js";

const getStoreByName = async (req, res) => {
  const { store } = req.params;

  try {
    const storeData = await StoreService.findStoreByName(store);
    if (!storeData) {
      return res.status(404).json({ message: "Store not found" });
    }

    const addresses = await StoreService.findAddressesByStoreId(storeData._id);

    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getStoreByName,
};
