import PopularSearches from "../models/popularSearcheSchema.js";
import searchResults from "../services/searchResults.js";
import itemService from "../services/item.js";
import item from "../models/item.js";

async function savePopularSearches() {
  try {
    // Count the number of documents in the PopularSearches collection
    const count = await item.countDocuments();

    // If count is zero, the collection is empty
    if (count === 0) {
      // Find all documents in the PopularSearches collection and populate the referenced fields
      const popularSearches = await PopularSearches.find()
        .populate("gender")
        .populate("category")
        .populate("color")
        .populate("size")
        .populate("store");

      for (const search of popularSearches) {
        console.log("Gender:", search.gender._doc.name);
        console.log("Category:", search.category._doc.name);
        console.log("Color:", search.color._doc.name);
        console.log("Size:", search.size._doc.name);
        console.log("Store:", search.store._doc.name);
        console.log("-----------------------------");

        // Perform the search and wait for the results
        let results = await searchResults.searchResults(
          search.gender._doc.name,
          search.category._doc.name,
          search.color._doc.name,
          search.size._doc.name,
          search.store._doc.name
        );

        if (results.length > 0) {
          if (results.length < 5) {
            console.log("5");
          }
          // Add the results to the DB and wait for the operation to complete
          await itemService.createItem(results);
        } else {
          console.log("empty");
        }
      }
    }
  } catch (error) {
    console.error("Error fetching popular searches:", error);
  }
}

export default {
  savePopularSearches,
};
