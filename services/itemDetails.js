import Item from "../models/item.js";

const getItemDetails = async (id) => {
    try {
        const item = await Item.findById(id);
        if (item) {
            console.log("item-service:", item)
            return item;
        }
        return null;
    } catch (err) {
        console.error(err);
        return null;
    }
};

export default {
    getItemDetails
  };