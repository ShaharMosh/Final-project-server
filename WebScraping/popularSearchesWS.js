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
        let gender = search.gender._doc.name;
        let category = search.category._doc.name;
        let color = search.color._doc.name;
        let size = search.size._doc.name;
        let store = search.store._doc.name;

        // Perform the search and wait for the results
        let results = await searchResults.searchResults(
          gender,
          category,
          color,
          size,
          store
        );

        if (results.length > 0) {
          // Add the results to the DB and wait for the operation to complete
          await itemService.createItem(results);
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
