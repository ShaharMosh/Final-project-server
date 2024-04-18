import Store from '../models/store.js';
import Size from '../models/size.js';
import Color from '../models/color.js';
import Category from '../models/category.js';
import Item from '../models/item.js';
import Gender from '../models/gender.js';

const createItem = async (results) => {
  const addedItems = [];

  try {
    for (const resultsPerUrl of results) {
      // Iterate through each item in the searchResults
      for (const result of resultsPerUrl) {
        console.log("resultS", results);

        console.log("result", result);
        console.log("result-NAME", result.name);
        if (result.name !== 'N/A') {

          const store = await Store.findOne({ name: result.store});
          const gender = await Gender.findOne({ name: result.gender });
          const size = await Size.findOne({ name: result.size });
          const category = await Category.findOne({ name: result.category });
          const color = await Color.findOne({ name: result.color });


          // Check if an item with similar characteristics already exists
          const existingItem = await Item.findOne({
            name: result.name,
            url: result.URL,
            gender: gender._id,
            category: category._id,
            color: color._id,
            size: size._id,
            store: store._id,
          });

          if (existingItem) {
            return { success: true, message: 'Exist' };

          } else {
            console.log("try create");
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
              color_url: result.color_url
            });

            // Save the item to the database
            const savedItem = await item.save();
            addedItems.push(savedItem);
            console.log("finish create");

          }
        }
      }
      return { success: true, addedItems: addedItems };
    }
  } catch (error) {
    console.error('Error saving items to the database:', error);
  }
};

export default {
  createItem
};