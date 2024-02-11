import searchResultsService from "../services/searchResults.js";

const sendSearchResults = async (req, res) => {

    const searchResults = await searchResultsService.searchResults();

    if (Object.keys(searchResults).length !== 0) {
        res.json(searchResults);
    } else {
        res.json({ error: 'no results' });
    }
};

export { sendSearchResults };