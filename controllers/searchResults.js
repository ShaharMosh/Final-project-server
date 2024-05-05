import searchResults from "../services/searchResults.js";
import itemService from "../services/item.js";
import Store from "../models/store.js";
import mongoose from "mongoose";
import Size from "../models/size.js";
import Color from "../models/color.js";
import Category from "../models/category.js";
import Gender from "../models/gender.js";

const { ObjectId } = mongoose.Types;

const getSearchParmsFromUser = async (req, res) => {
  const { gender, category, colors, sizes, stores } = req.body;
  console.log("req.body", req.body);

  var allResults = [];

  var genderId = await Gender.findOne({ name: gender });
  genderId = genderId._id;
  var categoryId = await Category.findOne({ name: category });
  categoryId = categoryId._id;

  // Check if items that meet the search criteria appear in the DB
  for (const store of stores) {
    var storeId = await Store.findOne({ name: store });
    storeId = storeId._id;

    for (const size of sizes) {
      var sizeId = await Size.findOne({ name: size });
      sizeId = sizeId._id;

      for (const color of colors) {
        var colorId = await Color.findOne({ name: color });
        colorId = colorId._id;

        const existingItems = await itemService.findItems(
          genderId,
          categoryId,
          colorId,
          sizeId,
          storeId
        );

        // There is no item with these parameters in the DB, so get the data from the site
        if (existingItems.length === 0) {
          let results = await searchResults.searchResults(
            gender,
            category,
            color,
            size,
            store
          );

          results.forEach((item) => {
            allResults.push(item);
          });

          // Add the results to the DB
          itemService.createItem(results);
        } else {
          // There are items that match the parameters in the DB
          existingItems.forEach((item) => {
            allResults.push(item);
          });
        }
      }
    }
  }

  if (allResults.length !== 0) {
    const responseItemsPromises = allResults.map(async (item) => {
      // If the items are already in the db.
      if (item.store instanceof ObjectId) {
        try {
          const store = await Store.findById(item.store);
          if (store) {
            return {
              id: item._id,
              image: item.image,
              price: item.price,
              company: store.name,
              name: item.name,
            };
          }
        } catch (error) {
          console.error("Error finding store:", error);
          // Handle error in db.
          return {
            id: item._id,
            image: item.image,
            price: item.price,
            company: "Unknown",
            name: item.name,
          };
        }
      } else {
        // If the items are from scraping.
        return {
          id: item._id,
          image: item.image,
          price: item.price,
          company: item.store,
          name: item.name,
        };
      }
    });

    const responseItems = await Promise.all(responseItemsPromises);

    console.log(responseItems);

    res.json(responseItems);
  } else {
    res.json({ error: "Items not found" });
  }
};

export { getSearchParmsFromUser };
