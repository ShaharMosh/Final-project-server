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

import user from "./routes/user.js";
import details from "./routes/details.js";
app.use('/api', userRegister);
app.use('/api', userLogin);
app.use('/api', user);
console.log('appp')
app.use('/api', details);

import item from "./services/item.js";
item.createItem();

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
  "https://www.castro.com/shop-home/mood/flash_sale?price=8_15": {
    itemSelector: ".products.list.items.product-items li",
    nameSelector: ".product-category-name.product-name a",
    priceSelector: ".price-wrapper .price:not(:contains('0.00'))",
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
      imageSelector: ".rimage__image",
      URLSelector: ".image-cont a",
    },
    "https://fashionclub.co.il/product-category/%d7%91%d7%92%d7%93%d7%99%d7%9d/%d7%9e%d7%9b%d7%a0%d7%a1%d7%99%d7%99%d7%9d/jeans?filter=category&pa_color%5B%5D=1384&pa_size%5B%5D=16&minPrice=0&maxPrice=139":
    {
      itemSelector: ".product-col",
      nameSelector: ".product-title a",
      priceSelector: ".amount bdi",
      imageSelector: ".slide-img-wrap img",
      URLSelector: "a",
    },

    // GOLF, H&0, תמנון, סטודיו פשה- shahar
    // אורבניקה, Hoodies, twentyfourseven + colors - Adi
};

const [website, config] = Object.entries(websitesToScrape)[3];
const scrapedData = await scrapeWebsite(website, config);
console.log(scrapedData);
