import searchResultsService from "../services/searchResults.js";

const sendSearchResults = async (req, res) => {

    const { gender, category, color, size, store } = req.body;
    console.log("Extracted Search Fields:", { gender, category, color, size, store });
    const searchResults = await searchResultsService.searchResults();

    if (Object.keys(searchResults).length !== 0) {
        res.json(searchResults);
    } else {
        res.json({ error: 'no results' });
    }
};

export { sendSearchResults };