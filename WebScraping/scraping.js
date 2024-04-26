import * as cheerio from "cheerio";
import { chromium } from "playwright";

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Function to perform the web scraping for a website
async function scrapeWebsite(url, config, gender, category, size, color) {
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto(url);

    // Extract data from the webpage using Playwright's API
    const content = await page.content();
    const $ = cheerio.load(content);

    const productInfo = [];

    $(config.itemSelector).each((index, element) => {
      const productName = $(element).find(config.nameSelector).text().trim();

      // Get an array of all prices within the current item
      const prices = $(element)
        .find(config.priceSelector)
        .map(function () {
          return parseFloat(
            $(this)
              .text()
              .trim()
              .replace(/[^\d.]/g, "")
          ); // Remove non-numeric characters and convert to number
        })
        .get();

      // Find the minimum price
      const productPrice = Math.min(...prices).toFixed(2);

      var productImage =
        $(element).find(config.imageSelector).attr("src") ||
        $(element).find(config.imageSelector).attr("data-src");

      var productURL = $(element).find(config.URLSelector).attr("href");

      var domain = new URL(url).hostname;
      var parts = domain.split(".");

      // Remove "www" if present and remove unwanted parts
      var filteredParts =
        parts[0] === "www"
          ? parts
              .slice(1)
              .filter(
                (part) =>
                  part.toLowerCase() !== "co" && part.toLowerCase() !== "il"
              )
          : parts.filter(
              (part) =>
                part.toLowerCase() !== "co" && part.toLowerCase() !== "il"
            );

      var store = filteredParts[0];

      if (domain.includes("golf-il")) {
        store = "golf";
      }
      if (domain.includes("urbanica")) {
        store = "urbanica";
      }

      if (url.includes("renuar")) {
        productURL = "https://www.renuar.co.il" + productURL;
      }

      var productColors = $(element).find(config.colorSelector);
      const productColor = [];
      productColors.each(function () {
        const backgroundColor =
          $(this).attr("option-tooltip-value") ||
          $(this).attr("src") ||
          $(this).css("background-color") ||
          $(this).css("--bg-value");
        if (backgroundColor != "null") {
          productColor.push(backgroundColor);
        }
      });

      var twentyfourseven = "twentyfourseven";
      if (url.includes(twentyfourseven)) {
        productURL = "https://www.twentyfourseven.co.il" + productURL;
      }

      productInfo.push({
        name: productName || "N/A",
        price: productPrice || "N/A",
        image: productImage || "N/A",
        URL: productURL || "N/A",
        color: color,
        store: capitalizeFirstLetter(store) || "N/A",
        gender: gender,
        category: category,
        size: size,
        color_url: productColor || "N/A",
      });
    });

    await browser.close();

    return productInfo;
  } catch (error) {
    console.error("Error scraping ${url}:", error.message);
    return [];
  }
}

// The function receives the URL of a particular item and the configuration.
// Returns a list of images of the item
async function getImages(url, config) {
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto(url);

    // Extract data from the webpage using Playwright's API
    const content = await page.content();
    const $ = cheerio.load(content);

    const images = [];
    $(config.specificItemSelector).each((index, element) => {
      var productImages = $(element).find(config.imageItemSelector);
      productImages.each(function () {
        const image = $(this).attr("src");

        // Check if the image does not exist in the array
        if (image !== undefined && !images.includes(image)) {
          images.push(image);
        }
      });
    });

    await browser.close();

    return images;
  } catch (error) {
    console.error("Error scraping ${url}:", error.message);
    return [];
  }
}

export { scrapeWebsite, getImages };
