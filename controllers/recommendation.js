import { runPythonScript } from '../services/recommendation.js';
import { ObjectId } from 'mongodb';
import Item from '../models/item.js'; // Adjust the import path if necessary

export const runRecommendationScripts = async (req, res) => {
  try {
    console.log("Running first Python script...");
    const output = await runPythonScript('python/clusters.py');
    const selectedItems = output.selected_items;
    console.log("Selected items:", selectedItems);

    console.log("Running second Python script...");
    const similarItemsOutput = await runPythonScript('python/suggestions.py', selectedItems.join(' '));
    console.log("Similar items:", similarItemsOutput);

    const itemIds = similarItemsOutput.similar_items.map(id => new ObjectId(id)); 
    console.log("Fetching items from database for IDs:", itemIds);
    const items = await Item.find({ _id: { $in: itemIds } });

    console.log("Fetched items:", items);
    res.json({ selected_items: selectedItems, similar_items: items });
  } catch (error) {
    console.error(`Error in runRecommendationScripts: ${error.message}`);
    res.status(500).send(`Error in runRecommendationScripts: ${error.message}`);
  }
};