import searchResultsService from "../services/searchResults.js";
import itemService from "../services/item.js";
import Store from "../models/store.js";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

const getSearchParmsFromUser = async (req, res) => {
  const { gender, category, colors, sizes, stores } = req.body;
  console.log("req.body", req.body);

  var allResults = [];

  //check first in db
  for (const store of stores) {
    for (const size of sizes) {
      for (const color of colors) {
        const existingItems = await itemService.findItems(
          gender,
          category,
          color,
          size,
          store
        );
        // There is no item with these parameters in the DB, so get the data from the site
        if (existingItems.length === 0) {
          const results = await searchResultsService.searchResults(
            gender,
            category,
            color,
            size,
            store
          );

          results.forEach((item) => {
            allResults.push(item);
          });

          await itemService.createItem(results);
        } else {
          // There are items that match the parameters in the DB
          existingItems.forEach((item) => {
            allResults.push(item);
          });
        }
      }
    }
  }

  if (allResults && allResults.length !== 0) {
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

  //const results = await searchResultsService.searchResults();

  // const result = await itemService.createItem(results);

  // if (addedItems && addedItems.length !== 0) {
  //     // Extract relevant details from added items
  //     const responseItems = addedItems.map(item => {
  //         return {
  //             id: item.id,
  //             image: item.image,
  //             price: item.price,
  //             company: item.company,
  //             name: item.name
  //         };
  //     });

  //     res.json(responseItems);
  // } else {
  //     res.json({ error: 'no results' });
  // }
};

export { getSearchParmsFromUser };
