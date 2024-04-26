import { scrapeWebsite } from "../WebScraping/scraping.js";
import { getConfig } from "../WebScraping/websitesHtml.js"
import { getUrl as getRenuarUrl } from "../WebScraping/Create_url/renuar.js";
import { getUrl as getCastroUrl } from "../WebScraping/Create_url/castro.js";
import { getUrl as getGolfUrl } from "../WebScraping/Create_url/golf.js";
import { getUrl as getStudiopashaUrl } from "../WebScraping/Create_url/studiopasha.js";
import { getUrl as getUrbanicaUrl } from "../WebScraping/Create_url/urbanica.js";
import { getUrl as getTwentyfoursevenUrl } from "../WebScraping/Create_url/twentyfourseven.js";
import { getUrl as getHoodiesUrl } from "../WebScraping/Create_url/hoodies.js";


const searchResults = async (gender, category, color, size, store) => {
    var scrapedData = [];

    // for (const store of stores) {
    const config = getConfig(store);
    // for (const size of sizes) {
    // for (const color of colors) {
    var url;
    switch (store) {
        case "Castro":
            url = getCastroUrl(gender, category, size, color);
            break;
        case "Renuar":
            url = getRenuarUrl(gender, category, size, color);
            break;
        // case "FashionClub":
        //     url=ge(gender, category, size, color);
        //     break;
        case "Golf":
            url = getGolfUrl(gender, category, size, color);
            break;
        // case "H&O":
        //     urls.push(get(gender, category, size, color));
        //     break;
        case "StudioPasha":
            url = getStudiopashaUrl(gender, category, size, color);
            break;
        case "Urbanica":
            url = getUrbanicaUrl(gender, category, size, color);
            break;
        case "TwentyFourSeven":
            url = getTwentyfoursevenUrl(gender, category, size, color);
            break;
        case "Hoodies":
            url = getHoodiesUrl(gender, category, size, color);
            break;
    }

    const items = await scrapeWebsite(url, config, gender, category, size, color);

    for (const item of items) {
        if (item.name !== 'N/A') {
            scrapedData = scrapedData.concat(item);
        }
    }


    // }
    // }

    // }
    return scrapedData;
};

export default {
    searchResults,
};
