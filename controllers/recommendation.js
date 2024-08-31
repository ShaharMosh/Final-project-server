import { runPythonScript } from "../services/recommendation.js";
import { ObjectId } from "mongodb";
import Item from "../models/item.js";
import userLogin from "../services/userLogin.js";

const { getUserId } = userLogin;

export const runRecommendationScripts = async (req, res) => {
  try {
    console.log("Running first Python script...");

    const scriptPath = "python/clusters.py";
    const userId = getUserId();
    const output = await runPythonScript(scriptPath, userId);

    const selectedItems = output.selected_items;
    const wishlistItems = output.wishlist_ids;

    console.log("Running second Python script...");

    // Combine selectedItems and wishlistItems into one argument string
    const args = `${selectedItems.join(",")} ${wishlistItems.join(",")}`;
    const similarItemsOutput = await runPythonScript(
      "python/suggestions.py",
      args
    );

    const itemIds = similarItemsOutput.similar_items.map(
      (id) => new ObjectId(id)
    );

    // Fetch items and populate the store field
    const items = await Item.find({ _id: { $in: itemIds } })
      .populate("store")
      .exec();

    const orderedItems = itemIds.map((id) =>
      items.find((item) => item._id.equals(id))
    );

    res.json({ selected_items: selectedItems, similar_items: orderedItems });
  } catch (error) {
    console.error(`Error in runRecommendationScripts: ${error.message}`);
    res.status(500).send(`Error in runRecommendationScripts: ${error.message}`);
  }
};
