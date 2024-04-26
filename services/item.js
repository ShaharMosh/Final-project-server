import Store from "../models/store.js";
import Size from "../models/size.js";
import Color from "../models/color.js";
import Category from "../models/category.js";
import Item from "../models/item.js";
import Gender from "../models/gender.js";

const findItems = async (gender, category, color, size, store) => {
  const storeId = await Store.findOne({ name: store });
  const genderId = await Gender.findOne({ name: gender });
  const sizeId = await Size.findOne({ name: size });
  const categoryId = await Category.findOne({ name: category });
  const colorId = await Color.findOne({ name: color });

  // Check if an item with similar characteristics already exists
  const existingItem = await Item.find({
    gender: genderId._id,
    category: categoryId._id,
    color: colorId._id,
    size: sizeId._id,
    store: storeId._id,
  });

  return existingItem;
};

const createItem = async (results) => {
  try {
    for (const result of results) {
      // Iterate through each item in the searchResults
      if (result.name !== "N/A") {
        const store = await Store.findOne({ name: result.store });
        const gender = await Gender.findOne({ name: result.gender });
        const size = await Size.findOne({ name: result.size });
        const category = await Category.findOne({ name: result.category });
        const color = await Color.findOne({ name: result.color });

        // Check if an item with similar characteristics already exists
        const existingItem = await Item.findOne({
          url: result.URL,
          color: color._id,
          size: size._id,
        });

        if (!existingItem) {
          // Create a new Item instance
          const item = new Item({
            name: result.name,
            price: parseFloat(result.price),
            image: result.image,
            url: result.URL,
            gender: gender._id,
            category: category._id,
            color: color._id,
            size: size._id,
            store: store._id,
            color_url: result.color_url,
          });

          // Save the item to the database
          await item.save();
        }
      }
    }
  } catch (error) {
    console.error("Error saving items to the database:", error);
  }
};

export default {
  createItem,
  findItems,
};
