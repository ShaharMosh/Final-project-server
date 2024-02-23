import Store from '../models/store.js';
import Size from '../models/size.js';
import Color from '../models/color.js';
import Category from '../models/category.js';
import Item from '../models/item.js';
import Gender from '../models/gender.js';
import ShoeSize from '../models/shoeSize.js';

const createItem = async (results) => {
  console.log("a")
  console.log('results:', results)
  try {
    // Iterate through each item in the searchResults
    for (const data of results) {
      // Create a new Item instance
      const item = new Item({
        name: data.name,
        price: parseFloat(data.price), // Assuming price is a string, convert it to a number
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
      await item.save();
    }

    console.log('Items saved to the database successfully!');
  } catch (error) {
    console.error('Error saving items to the database:', error);
  }
};

// Call the function to save items to the database
//createItem(); // Assuming you want to call it here


  // const gender = await Gender.create({
  //   name: "Shirts"
  // });
  // const category = await Category.create({
  //     name: "Shirts"
  // });
  // const color = await Color.create({
  //     name: "red"
  // });
  // const size = await Size.create({
  //     name: "XS"
  // });
  // const store = await Store.create({
  //     name: "Castro"
  // });


  // const item = await Item.create({
  //   name: "shirt y",
  //   url: "https://www.castro.com/f8101383200",
  //   price: 50,
  //   image: "img",
  //   gender: "65cb8ed3fa9e98fa2b04a266",
  //   category: "65cb8d519c7ab562a4b16262",
  //   color: "65cb8c67cb0e6a1f2556c8f4",
  //   size: "65cb88f66e9b9bc7b36e5f29",
  //   store: "65cb8b3bfed58ace368c4e4d",
  //   sizeModel: 'Size',
  // });

export default {
  createItem
};