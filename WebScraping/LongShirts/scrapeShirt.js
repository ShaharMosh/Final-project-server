import axios from "axios";
import cheerio from "cheerio";

// Function to perform the web scraping for a single website
async function scrapeWebsite(url, config) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const productInfo = [];

    $(config.nameSelector).each((index, element) => {
      const productName = $(element).find(config.nameSelector).text().trim();
      const productPrice = $(element).find(config.priceSelector).text().trim();
      const productImage = $(element).find(config.imageSelector).attr("src");
      console.log(productName);
      productInfo.push({
        name: productName,
        price: productPrice, // Uncomment this line if you have the priceSelector
        image: productImage, // Uncomment this line if you have the imageSelector
      });
    });

    console.log(`Scraped information from ${url}:`, productInfo);
    return productInfo;
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    return [];
  }
}

// Function to perform web scraping for multiple websites
async function scrapeMultipleWebsites(websites) {
  const scrapingPromises = websites.map(async (site) => {
    return await scrapeWebsite(site.url, site.config);
  });

  try {
    const results = await Promise.all(scrapingPromises);
    // Process the results as needed
    console.log("All scraping completed:", results);
  } catch (error) {
    console.error("Error scraping websites:", error);
  }
}

export { scrapeWebsite, scrapeMultipleWebsites };
