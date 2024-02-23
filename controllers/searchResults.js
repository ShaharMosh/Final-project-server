import searchResultsService from "../services/searchResults.js";
import itemService from "../services/item.js";

const sendSearchResults = async (req, res) => {
    console.log("1")

    const { gender, category, color, size, store } = req.body;
    console.log("Extracted Search Fields:", { gender, category, color, size, store });

    const results = await searchResultsService.searchResults();
    console.log("here")
    await itemService.createItem(results); // await here



    if (Object.keys(results).length !== 0) {
        res.json(results);
    } else {
        res.json({ error: 'no results' });
    }
};

export { sendSearchResults };