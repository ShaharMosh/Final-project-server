import PopularSearches from "../models/popularSearcheSchema.js";
import searchResults from "../services/searchResults.js";
import itemService from "../services/item.js";
import item from "../models/item.js";

async function savePopularSearches() {
  try {
    // Count the number of documents in the PopularSearches collection
    const count = await item.countDocuments();

    // If count is not zero, no need to fetch and process
    if (count !== 0) {
      return;
    }

    // Find all documents in the PopularSearches collection and populate the referenced fields
    const popularSearches = await PopularSearches.find().populate([
      "gender",
      "category",
      "color",
      "size",
      "store",
    ]);

    for (const search of popularSearches) {
      const { gender, category, color, size, store } = search;

      // Extract names from populated objects
      const genderName = gender._doc.name;
      const categoryName = category._doc.name;
      const colorName = color._doc.name;
      const sizeName = size._doc.name;
      const storeName = store._doc.name;

      const results = await searchResults.searchResults(
        genderName,
        categoryName,
        colorName,
        sizeName,
        storeName
      );

      if (results.length > 0) {
        // Add the results to the DB and wait for the operation to complete
        await itemService.createItem(results);
      }
    }
  } catch (error) {
    console.error("Error fetching popular searches:", error);
  }
}

export default {
  savePopularSearches,
};
