import StoreService from '../services/addresses.js';

const getStoreByName = async (req, res) => {
  const { store } = req.params;
  console.log(`Received request for store: ${store}`);

  try {
    const storeData = await StoreService.findStoreByName(store);
    if (!storeData) {
      console.log(`Store not found: ${store}`);
      return res.status(404).json({ message: 'Store not found' });
    }

    console.log(`Found store: ${storeData.name}, ID: ${storeData._id}`);

    const addresses = await StoreService.findAddressesByStoreId(storeData._id);
    console.log(`Found ${addresses.length} addresses for store ID: ${storeData._id}`);

    res.status(200).json(addresses);
  } catch (error) {
    console.error('Error fetching store:', error);
    res.status(500).json({ message: error.message });
  }
};

export default {
  getStoreByName,
};