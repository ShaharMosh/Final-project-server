import { scrapeWebsite } from "./WebScraping/scraping.js";

import express from "express";
import customEnv from "custom-env";
import http from "http";

const app = express();

import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

customEnv.env(process.env.NODE_ENV, "./config");
console.log("CONNECTION_STRING:", process.env.CONNECTION_STRING);
console.log("PORT:", process.env.PORT);

import cors from "cors";
app.use(cors());

import userRegister from "./routes/userRegister.js";
import userLogin from "./routes/userLogin.js";
app.use("/api", userRegister);
app.use("/api", userLogin);

app.use(express.static("public"));

import { MongoClient } from "mongodb";
const client = new MongoClient("mongodb://127.0.0.1:27017");
try {
  // Connect to the MongoDB server
  await client.connect();
  console.log("Connected to the database");
} catch (error) {
  console.error("Error connecting to the database", error);
}
const server = http.createServer(app);
server.listen(process.env.PORT);

const websitesToScrape = {
  "https://www.castro.com/sale/categories/men?color_group=1785": {
    itemSelector: ".products.list.items.product-items li",
    nameSelector: ".product-category-name.product-name a",
    priceSelector: ".price-wrapper[data-price-amount]",
    imageSelector: ".product-image-photo",
    URLSelector: ".quickview a.product_quickview",
  },
  "https://www.renuar.co.il/women/shoes/?page=women": {
    itemSelector: ".set-item.product-tile.js-product-tile.h-100",
    nameSelector: ".tile-body h3",
    priceSelector: ".value[content]",
    imageSelector: ".tile-thumbnail img",
    URLSelector: "a",
  },
  "https://adikastyle.com/collections/winter-collection?filter.v.price.lte=81&filter.v.availability=1&sort_by=manual":
    {
      itemSelector: ".block-inner",
      nameSelector: ".product-block__title",
      priceSelector: ".product-price__item",
      imageSelector: ".rimage-wrapper img.rimage__image",
      URLSelector: "a",
    },
};

const [website, config] = Object.entries(websitesToScrape)[2];
const scrapedData = await scrapeWebsite(website, config);
console.log(scrapedData);
