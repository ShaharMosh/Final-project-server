import * as cheerio from "cheerio";
import { chromium } from "playwright";

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function extractUrlFromBackground(backgroundStyle) {
  // Regular expression to extract the URL
  const regex = /url\((.*?)\)/;

  // Match the regex against the string
  const match = backgroundStyle.match(regex);

  // Extract the URL from the match
  if (match && match[1]) {
    return match[1];
  }

  return null;
}

// Function to perform the web scraping for a website
async function scrapeWebsite(url, config, gender, category, size, color) {
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle" });

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
      } else if (domain.includes("urbanica")) {
        store = "urbanica";
      } else if (domain.includes("terminalx")) {
        store = "yanga";
        productURL = "https://www.terminalx.com" + productURL;
      } else if (url.includes("renuar")) {
        productURL = "https://www.renuar.co.il" + productURL;
      } else if (url.includes("twentyfourseven")) {
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
// Returns an array that contains an array of images and an array of colors.
async function getImagesAndColors(url, config) {
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle" });

    // Wait explicitly for the elements you are interested in
    await page.waitForSelector(config.imagesItemSelector);
    await page.waitForSelector(config.colorsItemSelector);

    // Extract data from the webpage using Playwright's API
    const content = await page.content();
    const $ = cheerio.load(content);

    const images = [];
    const colors = [];

    $(config.imagesItemSelector).each((index, element) => {
      var productImages = $(element).find(config.imageItemSelector);
      productImages.each(function () {
        const image = $(this).attr("src");

        // Check if the image does not exist in the array
        if (image !== undefined && !images.includes(image)) {
          images.push(image);
        }
      });
    });

    $(config.colorsItemSelector)
      .first()
      .find(config.colorSelector)
      .each(function () {
        var backgroundColor =
          $(this).attr("option-tooltip-value") ||
          $(this).css("background") ||
          $(this).css("background-image") ||
          $(this).css("background-color");

        if (backgroundColor) {
          if (backgroundColor.includes("url")) {
            backgroundColor = extractUrlFromBackground(backgroundColor);
          }

          if (backgroundColor != "null") {
            colors.push(backgroundColor);
          }
        }
      });

    await browser.close();

    return [images, colors];
  } catch (error) {
    console.error("Error scraping ${url}:", error.message);
    return [[], []];
  }
}

export { scrapeWebsite, getImagesAndColors };
