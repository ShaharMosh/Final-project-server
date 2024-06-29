import searchResults from "../services/searchResults.js";
import itemService from "../services/item.js";
import Store from "../models/store.js";
import Size from "../models/size.js";
import Color from "../models/color.js";
import Category from "../models/category.js";
import Gender from "../models/gender.js";
import DailySearches from "../models/dailySearches.js";

const getSearchParmsFromUser = async (req, res) => {
  const { gender, category, colors, sizes, stores } = req.body;

  try {
    // Fetch gender and category IDs in parallel
    const [genderRecord, categoryRecord] = await Promise.all([
      Gender.findOne({ name: gender }),
      Category.findOne({ name: category }),
    ]);

    if (!genderRecord || !categoryRecord) {
      return res.status(404).json({ error: "Invalid gender or category" });
    }

    const genderId = genderRecord._id;
    const categoryId = categoryRecord._id;

    let allResults = [];

    // Use Promise.all to fetch store, size, and color IDs in parallel for optimization
    await Promise.all(
      stores.map(async (store) => {
        const storeId = (await Store.findOne({ name: store }))._id;

        await Promise.all(
          sizes.map(async (size) => {
            const sizeId = (await Size.findOne({ name: size }))._id;

            await Promise.all(
              colors.map(async (color) => {
                const colorId = (await Color.findOne({ name: color }))._id;

                // Save the request to the daily searches table.
                const newSearch = new DailySearches({
                  gender: genderId,
                  category: categoryId,
                  color: colorId,
                  size: sizeId,
                  store: storeId,
                });
                await newSearch.save();

                // Check if items with these parameters exist in the DB
                let existingItems = await itemService.findItems(
                  genderId,
                  categoryId,
                  colorId,
                  sizeId,
                  storeId
                );

                if (existingItems.length === 0) {
                  // If no items found in the DB, retrieve data from the external source
                  let results = await searchResults.searchResults(
                    gender,
                    category,
                    color,
                    size,
                    store
                  );

                  // Add the results to the DB
                  await itemService.createItem(results);

                  // Fetch items again after adding them to the DB
                  existingItems = await itemService.findItems(
                    genderId,
                    categoryId,
                    colorId,
                    sizeId,
                    storeId
                  );
                }

                // There are items that match the parameters in the DB
                existingItems.forEach((item) => {
                  allResults.push(item);
                });
              })
            );
          })
        );
      })
    );

    if (allResults.length > 0) {
      const responseItems = await Promise.all(
        allResults.map(async (item) => {
          const store = await Store.findById(item.store);
          return {
            id: item.id,
            image: item.image,
            price: item.price,
            company: store.name,
            name: item.name,
          };
        })
      );
      console.log(responseItems);

      res.json(responseItems);
    } else {
      res.json({ error: "Items not found" });
    }
  } catch (error) {
    console.error("Error in processing:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { getSearchParmsFromUser };
