import Store from '../models/store.js';
import Address from '../models/addresses.js';

const findStoreByName = async (storeName) => {
  return await Store.findOne({ name: storeName });
};

const findAddressesByStoreId = async (storeId) => {
  return await Address.find({ name: storeId });
};

export default {
  findStoreByName,
  findAddressesByStoreId,
};