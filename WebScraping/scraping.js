import * as cheerio from "cheerio";
import { chromium } from "playwright";

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Function to perform the web scraping for a website
async function scrapeWebsite(url, config, gender, category, size, color) {
  let browser;

  try {
    browser = await chromium.launch();
    const page = await browser.newPage();

    // Disable unnecessary resource loading
    await page.route("**/*", (route) => {
      const request = route.request();
      const type = request.resourceType();
      // Abort loading of stylesheets, fonts, and images
      if (["stylesheet", "font", "image"].includes(type)) {
        route.abort();
      } else {
        route.continue();
      }
    });

    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

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
    console.error(`Error scraping ${url}:`, error.message);

    if (browser) {
      await browser.close();
    }

    return [];
  }
}

function extractUrlFromBackground(backgroundStyle) {
  // Regular expression to extract the URL
  const regex = /url\((.*?)\)/;
  const match = backgroundStyle.match(regex);
  return match && match[1] ? match[1] : null;
}

// The function receives the URL of a particular item and the configuration.
// Returns an array that contains an array of images and an array of colors.
async function getImagesAndColors(url, config) {
  let browser;

  try {
    browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });

    // Extract data from the webpage using Playwright's API
    const content = await page.content();
    const $ = cheerio.load(content);

    const imageSet = new Set();

    $(config.imagesItemSelector)
      .find(config.imageItemSelector)
      .each((i, img) => {
        let image = $(img).attr("src");

        if (image && url.includes("terminalx")) {
          const newText = "f112238e8de94b6d480bd02e7a9501b8";
          image = image.replace(/cache\/.*?\//, `cache/${newText}/`);
        }

        if (image) {
          imageSet.add(image); // Add to the Set to ensure uniqueness
        }
      });

    // Convert the Set back to an array if needed
    const images = Array.from(imageSet);

    // const imageTask = new Promise((resolve) => {
    //   const imageSet = new Set();

    //   $(config.imagesItemSelector)
    //     .find(config.imageItemSelector)
    //     .each((i, img) => {
    //       let image = $(img).attr("src");

    //       if (image && url.includes("terminalx")) {
    //         const newText = "f112238e8de94b6d480bd02e7a9501b8";
    //         image = image.replace(/cache\/.*?\//, `cache/${newText}/`);
    //       }

    //       if (image) {
    //         imageSet.add(image); // Add to the Set to ensure uniqueness
    //       }
    //     });

    //   resolve(Array.from(imageSet)); // Resolve with the images array
    // });

    const colors = [];

    const colorElements = $(config.colorsItemSelector)
      .first()
      .find(config.colorSelector);

    colorElements.each(function () {
      const $this = $(this);

      let backgroundColor =
        $this.attr("option-tooltip-value") ||
        $this.css("background") ||
        $this.css("background-image") ||
        $this.css("background-color");

      if (backgroundColor && backgroundColor !== "null") {
        if (backgroundColor.includes("url")) {
          backgroundColor = extractUrlFromBackground(backgroundColor);
        }

        colors.push(backgroundColor);
      }
    });

    // const colorTask = new Promise((resolve) => {
    //   const colors = [];

    //   const colorElements = $(config.colorsItemSelector)
    //     .first()
    //     .find(config.colorSelector);

    //   colorElements.each(function () {
    //     const $this = $(this);

    //     let backgroundColor =
    //       $this.attr("option-tooltip-value") ||
    //       $this.css("background") ||
    //       $this.css("background-image") ||
    //       $this.css("background-color");

    //     if (backgroundColor && backgroundColor !== "null") {
    //       if (backgroundColor.includes("url")) {
    //         backgroundColor = extractUrlFromBackground(backgroundColor);
    //       }

    //       colors.push(backgroundColor);
    //     }
    //   });

    //   resolve(colors); // Resolve with the colors array
    // });

    // const [images, colors] = await Promise.all([imageTask, colorTask]);

    await browser.close();
    return [images, colors];
    // return { images, colors };
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);

    if (browser) {
      await browser.close();
    }

    return [[], []];
  }
}

export { scrapeWebsite, getImagesAndColors };
