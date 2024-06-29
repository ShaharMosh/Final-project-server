import { scrapeWebsite } from "../WebScraping/scraping.js";
import { getConfig } from "../WebScraping/websitesHtml.js";
import { getUrl as getRenuarUrl } from "../WebScraping/Create_url/renuar.js";
import { getUrl as getCastroUrl } from "../WebScraping/Create_url/castro.js";
import { getUrl as getGolfUrl } from "../WebScraping/Create_url/golf.js";
import { getUrl as getStudiopashaUrl } from "../WebScraping/Create_url/studiopasha.js";
import { getUrl as getUrbanicaUrl } from "../WebScraping/Create_url/urbanica.js";
import { getUrl as getTwentyfoursevenUrl } from "../WebScraping/Create_url/twentyfourseven.js";
import { getUrl as getHoodiesUrl } from "../WebScraping/Create_url/hoodies.js";
import { getUrl as getYangaUrl } from "../WebScraping/Create_url/yanga.js";

const searchResults = async (gender, category, color, size, store) => {
  let scrapedData = [];
  const config = getConfig(store);
  let urls = [];

  switch (store) {
    case "Castro":
      urls = getCastroUrl(gender, category, size, color);
      break;
    case "Renuar":
      urls = getRenuarUrl(gender, category, size, color);
      break;
    case "Golf":
      urls = getGolfUrl(gender, category, size, color);
      break;
    case "Studiopasha":
      urls = getStudiopashaUrl(gender, category, size, color);
      break;
    case "Urbanica":
      urls = getUrbanicaUrl(gender, category, size, color);
      break;
    case "Twentyfourseven":
      urls = getTwentyfoursevenUrl(gender, category, size, color);
      break;
    case "Hoodies":
      urls = getHoodiesUrl(gender, category, size, color);
      break;
    case "Yanga":
      urls = getYangaUrl(gender, category, size, color);
      break;
  }

  if (urls && urls.length > 0) {
    // Parallelize URL scraping
    const scrapePromises = urls.map((url) =>
      scrapeWebsite(url, config, gender, category, size, color)
    );

    const results = await Promise.all(scrapePromises);

    // Flatten the results and filter out items with the name "N/A"
    scrapedData = results.flat().filter((item) => item.name !== "N/A");
  }

  return scrapedData;
};

export default {
  searchResults,
};
