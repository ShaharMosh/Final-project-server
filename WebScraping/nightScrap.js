
import dailySearches from "../models/dailySearches.js";
import searchResults from "../services/searchResults.js";
import item from "../models/item.js";
import fs from 'fs';
import cron from 'node-cron';

const filePath = './nightScrapResults.json';

async function saveNightScrapResults() {
    try {

        // Find all documents in the PopularSearches collection and populate the referenced fields
        const dailySearches = await dailySearches.find()
            .populate("gender")
            .populate("category")
            .populate("color")
            .populate("size")
            .populate("store");

        for (const search of dailySearches) {
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
                // Convert the results to a JSON string
                const jsonResults = JSON.stringify(results, null, 2);

                // Save the JSON string to a file
                fs.writeFile(filePath, jsonResults, (err) => {
                    if (err) {
                        console.error('Error writing to file', err);
                    } else {
                        console.log('Results saved to searchResults.json');
                    }
                });
            }
        }

    } catch (error) {
        console.error("Error fetching night scrap", error);
    }
}

async function updateItems() {
    try {
        // Read the JSON file
        const data = fs.readFileSync(filePath, 'utf8');
        const records = JSON.parse(data);

        // Process each record
        for (const record of records) {
            const existingItem = await item.findOne({ url: record.url });

            if (existingItem) {
                if (existingItem.price !== record.price) {
                    // Update the price of the existing item
                    existingItem.price = record.price;
                    await existingItem.save();
                    console.log(`Updated price for item with URL: ${record.url}`);
                }
            } else {
                // Add a new record to the database
                const newItem = new item({
                    name: record.name,
                    url: record.url,
                    price: record.price,
                    image: record.image,
                    gender: record.gender,
                    category: record.category,
                    color: record.color,
                    size: record.size,
                    store: record.store,
                });
                await newItem.save();
                console.log(`Added new item with URL: ${record.url}`);
            }
        }

    } catch (error) {
        console.error("Error update items table base on night scrap results", error);
    }

}


// Schedule the task to run every day at 3:00 AM
async function scheduleNightlyScraper() {
    //  function scheduleNightlyScraper() {
    // cron.schedule('0 3 * * *', async () => {
    //     console.log('Running nightly scraper');
    //     try {
    //         await saveNightScrapResults();
    //         await updateItems();

    //         fs.unlinkSync(filePath);
    //         console.log('Deleted searchResults.json');

    //         await dailySearches.deleteMany({});
    //         console.log('Cleared the dailySearches table');
    //     } catch (error) {
    //         console.error("Error in night scrapping", error);
    //     }
    // });

    try {
        await saveNightScrapResults();
        await updateItems();

        fs.unlinkSync(filePath);
        console.log('Deleted searchResults.json');

        await dailySearches.deleteMany({});
        console.log('Cleared the dailySearches table');
    } catch (error) {
        console.error("Error in night scrapping", error);
    }
}

export { scheduleNightlyScraper }