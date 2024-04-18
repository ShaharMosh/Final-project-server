import Store from '../models/store.js';
import Size from '../models/size.js';
import Color from '../models/color.js';
import Category from '../models/category.js';
import Item from '../models/item.js';
import Gender from '../models/gender.js';
import ShoeSize from '../models/shoeSize.js';

const createItem = async (results) => {
  const addedItems = [];

  try {
    // Iterate through each item in the searchResults
    for (const data of results) {
      // Check if an item with similar characteristics already exists
      const existingItem = await Item.findOne({
        name: data.name,
        price: parseFloat(data.price),
        image: data.image,
        url: data.URL,
        gender: "65cb8ed3fa9e98fa2b04a266",
        category: "65cb8d519c7ab562a4b16262",
        color: "65cb8c67cb0e6a1f2556c8f4",
        size: "65cb88f66e9b9bc7b36e5f29",
        store: "65cb8b3bfed58ace368c4e4d",
        sizeModel: 'Size',
      });

      if (existingItem) {
        return { success: true, message: 'Exist' };

      } else {
        // Create a new Item instance
        const item = new Item({
          name: data.name,
          price: parseFloat(data.price),
          image: data.image,
          url: data.URL,
          gender: "65cb8ed3fa9e98fa2b04a266",
          category: "65cb8d519c7ab562a4b16262",
          color: "65cb8c67cb0e6a1f2556c8f4",
          size: "65cb88f66e9b9bc7b36e5f29",
          store: "65cb8b3bfed58ace368c4e4d",
          sizeModel: 'Size',
        });

        // Save the item to the database
        const savedItem = await item.save();
        addedItems.push(savedItem);
      }
    }
    return { success: true, addedItems: addedItems };

  } catch (error) {
    console.error('Error saving items to the database:', error);
  }
};

export default {
  createItem
};