import dailySearches from "../models/dailySearches.js";
import searchResults from "../services/searchResults.js";
import item from "../models/item.js";
import fs from "fs";
import cron from "node-cron";
import Store from "../models/store.js";
import Size from "../models/size.js";
import Color from "../models/color.js";
import Category from "../models/category.js";
import Gender from "../models/gender.js";

const filePath = "./nightScrapResults.json";

async function saveNightScrapResults() {
  try {
    let allResults = [];

    // Find all documents in the PopularSearches collection and populate the referenced fields
    const dailyResults = await dailySearches
      .find()
      .populate("gender")
      .populate("category")
      .populate("color")
      .populate("size")
      .populate("store");

    for (const search of dailyResults) {
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
        allResults.push(...results);
      }
    }

    // Convert the results to a JSON string
    const jsonResults = JSON.stringify(allResults, null, 2);

    // Save the JSON string to a file synchronously
    fs.writeFileSync(filePath, jsonResults);
  } catch (error) {
    console.error("Error fetching night scrap", error);
  }
}

async function updateItems() {
  try {
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Read the JSON file
      const data = fs.readFileSync(filePath, "utf8");
      if (data.trim()) {
        const records = JSON.parse(data);

        // Process each record
        for (const record of records) {
          const existingItem = await item.findOne({ url: record.URL });

          if (existingItem) {
            if (existingItem.price !== parseFloat(record.price)) {
              existingItem.price = parseFloat(record.price);
              await existingItem.save();
              console.log("Updated price for item with URL: ${record.URL}");
            }
          } else {
            var genderId = await Gender.findOne({ name: record.gender });
            genderId = genderId._id;

            var categoryId = await Category.findOne({ name: record.category });
            categoryId = categoryId._id;

            var storeId = await Store.findOne({ name: record.store });
            storeId = storeId._id;

            var sizeId = await Size.findOne({ name: record.size });
            sizeId = sizeId._id;

            var colorId = await Color.findOne({ name: record.color });
            colorId = colorId._id;

            // Add a new record to the database
            const newItem = new item({
              name: record.name,
              url: record.URL,
              price: record.price,
              image: record.image,
              gender: genderId,
              category: categoryId,
              color: colorId,
              size: sizeId,
              store: storeId,
            });
            await newItem.save();
            console.log("Added new item with URL: ${record.URL}");
          }
        }
      }
    }
  } catch (error) {
    console.error(
      "Error update items table base on night scrap results",
      error
    );
  }
}

// Schedule the task to run every day at 3:00 AM
async function scheduleNightlyScraper() {
  cron.schedule("0 3 * * *", async () => {
    console.log("Running nightly scraper");
    try {
      await saveNightScrapResults();
      await updateItems();

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log("Deleted searchResults.json");
      }

      await dailySearches.deleteMany({});
      console.log("Cleared the dailySearches table");
    } catch (error) {
      console.error("Error in night scrapping", error);
    }
  });
}

export { scheduleNightlyScraper };
