import { scrapeWebsite } from "../WebScraping/scraping.js";
import Item from "../models/item.js";

const searchResults = async () => {

    const websitesToScrape = {
        "https://www.urbanica-wh.com/women/%D7%A9%D7%9E%D7%9C%D7%95%D7%AA?product_type=3309&size_group=974": {
            itemSelector: ".product",
            nameSelector: ".product-name a",
            priceSelector: '.price-wrapper[data-price-amount]:not([data-price-amount=""])',
            imageSelector: ".product-image-photo",
            URLSelector: "a",
        },
    };

    const [website, config] = Object.entries(websitesToScrape)[0];
    const scrapedData = await scrapeWebsite(website, config);
    //console.log(scrapedData);

    return scrapedData;;
};

export default {
    searchResults,
};
