import { runPythonScript } from '../services/recommendation.js';
import { ObjectId } from 'mongodb';
import Item from '../models/item.js'; // Adjust the import path if necessary

export const runRecommendationScripts = async (req, res) => {
  try {
    console.log("Running first Python script...");
    const output = await runPythonScript('python/clusters.py');
    const selectedItems = output.selected_items;
    const wishlistItems = output.wishlist_ids;
    console.log("Selected items:", selectedItems);
    console.log("Wishlist items:", wishlistItems);

    // Combine selectedItems and wishlistItems into one argument string
    const args = `${selectedItems.join(',')} ${wishlistItems.join(',')}`;

    console.log("Running second Python script...");
    const similarItemsOutput = await runPythonScript('python/suggestions.py', args);
    console.log("Similar items output:", similarItemsOutput);

    const itemIds = similarItemsOutput.similar_items.map(id => new ObjectId(id));

    // Fetch items and ensure they are in the same order as itemIds
    const items = await Item.find({ _id: { $in: itemIds } });
    const orderedItems = itemIds.map(id => items.find(item => item._id.equals(id)));

    // Print out the fields of the items
    console.log("Fetched items fields:");
    orderedItems.forEach(item => {
      console.log(item); // This will print each item object
    });

    res.json({ selected_items: selectedItems, similar_items: orderedItems });
  } catch (error) {
    console.error(`Error in runRecommendationScripts: ${error.message}`);
    res.status(500).send(`Error in runRecommendationScripts: ${error.message}`);
  }
};