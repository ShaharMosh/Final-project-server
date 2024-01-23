import axios from "axios";
import cheerio from "cheerio";

// Function to perform the web scraping for a single website
async function scrapeWebsite(url, config) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const productInfo = [];

    $(config.itemSelector).each((index, element) => {
      const productName = $(element).find(config.nameSelector).text().trim();
      const productPrice = $(element)
        .find(config.priceSelector)
        .first()
        .text()
        .trim();
      const productImage = $(element).find(config.imageSelector).attr("src");
      const productURL = $(element).find(config.URLSelector).attr("href");

      productInfo.push({
        name: productName || "N/A",
        price: productPrice || "N/A",
        image: productImage || "N/A",
        URL: productURL || "N/A",
      });
    });

    // console.log(`Scraped information from ${url}:`, productInfo);
    return productInfo;
  } catch (error) {
    console.error("Error scraping ${url}:", error.message);
    return [];
  }
}

export { scrapeWebsite };
