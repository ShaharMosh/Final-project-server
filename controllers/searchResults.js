import searchResultsService from "../services/searchResults.js";
import itemService from "../services/item.js";
import Item from "../models/item.js";

const getSearchParmsFromUser = async (req, res) => {

    const { gender, category, color, size, store } = req.body;
    console.log("Extracted Search Fields:", { gender, category, color, size, store });
     ////check first in db
    const results = await searchResultsService.searchResults(gender, category, color, size, store);
    await itemService.createItem(results, {gender, category, size}); // await here

    const itemIds = ["65d5dd21b87d4cd458164534"];

    const items = await Item.find({ _id: { $in: itemIds } });

    if (items && items.length !== 0) {
        const responseItems = items.map(item => {
            return {
                id: item.id,
                image: item.image,
                price: item.price,
                company: item.store.name,
                name: item.name
            };
        });
        res.json(responseItems);
    } else {
        res.json({ error: 'Items not found' });
    }


    //const results = await searchResultsService.searchResults();

    // const result = await itemService.createItem(results);


    // if (addedItems && addedItems.length !== 0) {
    //     // Extract relevant details from added items
    //     const responseItems = addedItems.map(item => {
    //         return {
    //             id: item.id,
    //             image: item.image,
    //             price: item.price,
    //             company: item.company,
    //             name: item.name
    //         };
    //     });

    //     res.json(responseItems);
    // } else {
    //     res.json({ error: 'no results' });
    // }
};

export { getSearchParmsFromUser };