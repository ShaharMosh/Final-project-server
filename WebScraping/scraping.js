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

      // Get an array of all prices within the current item
      const prices = $(element).find(config.priceSelector).map(function () {
        return parseFloat($(this).text().trim().replace(/[^\d.]/g, '')); // Remove non-numeric characters and convert to number
      }).get();

      // Find the minimum price
      const productPrice = Math.min(...prices).toFixed(2);

      var productImage =
        $(element).find(config.imageSelector).attr("src") ||
        $(element).find(config.imageSelector).attr("data-src");
      var productURL = $(element).find(config.URLSelector).attr("href");


      var domain = new URL(url).hostname;
      var parts = domain.split(".");
    
      // Remove "www" if present and remove unwanted parts
      var filteredParts = (parts[0] === "www") ? parts.slice(1).filter(part => part.toLowerCase() !== "co" && part.toLowerCase() !== "il") : parts.filter(part => part.toLowerCase() !== "co" && part.toLowerCase() !== "il");
    
      var companyName = filteredParts[0];

      if (domain.includes("golf-il")) {
        companyName = "golf";
      }
      if (domain.includes("urbanica")) {
        companyName = "urbanica";
      }

      var adikastyle = "adikastyle";
      if (url.includes(adikastyle)) {
        productURL = "https://adikastyle.com" + productURL;
        productImage = productImage.replace('{width}', '480')
      }

      var renuar = "renuar";
      if (url.includes(renuar)) {
        productURL = "https://www.renuar.co.il" + productURL;
      }

      var twentyfourseven = "twentyfourseven";
      if (url.includes(twentyfourseven)) {
        productURL = "https://www.twentyfourseven.co.il" + productURL;
      }

      productInfo.push({
        name: productName || "N/A",
        price: productPrice || "N/A",
        image: productImage || "N/A",
        URL: productURL || "N/A",
        company: companyName || "N/A"
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
