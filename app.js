import { scrapeWebsite, getImages } from "./WebScraping/scraping.js";
import { getUrl } from "./WebScraping/Data/renuar_data.js";

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
import password from "./routes/password.js";
import searchResults from "./routes/searchResults.js";
app.use("/api", userRegister);
app.use("/api", userLogin);
app.use("/api", user);
app.use("/api", details);
app.use("/api", password);
app.use("/api", searchResults);

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
  "https://www.castro.com/women/our_favorites/new_arrivals?price=58_71&size=4842":
    {
      itemSelector: ".products.list.items.product-items li",
      nameSelector: ".product-category-name.product-name a",
      priceSelector: ".price-wrapper .price:not(:contains('0.00'))",
      imageSelector: ".product-image-photo",
      URLSelector: ".quickview a.product_quickview",
      colorSelector: ".swatch-option",
      specificItemSelector: ".slick-track",
      imageItemSelector: ".img_zoom",
    },
  "https://www.renuar.co.il/women/shoes/?page=women": {
    itemSelector: ".set-item.product-tile.js-product-tile.h-100",
    nameSelector: ".tile-body h3",
    priceSelector: ".value[content]",
    imageSelector: ".tile-thumbnail img",
    URLSelector: "a",
    colorSelector: ".swatch[src]",
    specificItemSelector: ".owl-stage",
    imageItemSelector: ".main-image__carousel-image",
  },
  "https://fashionclub.co.il/product-category/%d7%91%d7%92%d7%93%d7%99%d7%9d/%d7%9e%d7%9b%d7%a0%d7%a1%d7%99%d7%99%d7%9d/jeans?filter=category&pa_color%5B%5D=1384&pa_size%5B%5D=16&minPrice=0&maxPrice=139":
    {
      itemSelector: ".product-col",
      nameSelector: ".product-detail .product-title a",
      priceSelector: ".amount bdi",
      imageSelector: ".slide-img-wrap img",
      URLSelector: ".product-title a",
      colorSelector: ".variable-item-span-color",
      specificItemSelector: ".slick-track",
      imageItemSelector: ".hover_zoom",
    },
  "https://www.golf-il.co.il/women/sweater-and-knitted-shirts?size=2769": {
    itemSelector: ".product-item",
    nameSelector: ".product-name a",
    priceSelector: ".price:not(:contains('0.00'))",
    imageSelector: ".product-image-wrapper img",
    URLSelector: "a",
    colorSelector: ".swatch-option.color",
    specificItemSelector: ".slick-track",
    imageItemSelector: ".img_zoom",
  },
  "https://h-o.co.il/144343-%D7%A0%D7%A9%D7%99%D7%9D/144351-%D7%91%D7%99%D7%92%D7%95%D7%93/144429-%D7%9E%D7%9B%D7%A0%D7%A1%D7%99%D7%99%D7%9D?color_description=%D7%91%D7%96%27&size=46&type_of_product=%D7%A8%D7%92%D7%9C+%D7%99%D7%A9%D7%A8%D7%94":
    {
      itemSelector: ".product_addtocart_form",
      nameSelector: ".product-item-link",
      priceSelector: ".price:not(:contains('0.00'))",
      imageSelector: ".product-image-photo",
      URLSelector: "a",
      colorSelector: ".inline-block",
      specificItemSelector: ".relative",
      imageItemSelector: ".absolute",
    },
  "https://www.studiopasha.co.il/srigim.html?price=60-100&size=556": {
    itemSelector: ".product-item",
    nameSelector: ".product-item-name a",
    priceSelector: ".price:not(:contains('0.00'))",
    imageSelector: ".product-image-photo",
    URLSelector: "a",
    colorSelector: ".swatch-option[style*=background]",
    specificItemSelector: ".fotorama__stage__shaft",
    imageItemSelector: ".fotorama__img",
  },
  "https://www.urbanica-wh.com/women/%D7%A9%D7%9E%D7%9C%D7%95%D7%AA?product_type=3309&size_group=974":
    {
      itemSelector: ".product",
      nameSelector: ".product-name a",
      priceSelector:
        '.price-wrapper[data-price-amount]:not([data-price-amount=""])',
      imageSelector: ".product-image-photo",
      URLSelector: "a",
      colorSelector: ".swatch-attribute-options .swatch-option",
      specificItemSelector: ".slick-track",
      imageItemSelector: ".img_zoom",
    },
  "https://www.twentyfourseven.co.il/%D7%A0%D7%A9%D7%99%D7%9D/%D7%A0%D7%A2%D7%9C%D7%99%D7%99%D7%9D/%D7%A0%D7%A2%D7%9C%D7%99-%D7%91%D7%99%D7%AA/":
    {
      itemSelector: ".product",
      nameSelector: ".product_default_link",
      priceSelector: ".price .value",
      imageSelector: ".tile-image",
      URLSelector: "a",
      colorSelector: ".swatch-circle",
      specificItemSelector: ".owl-stage",
      imageItemSelector: ".main-image__carousel-image",
    },
  "https://www.hoodies.co.il/women/%D7%9E%D7%A2%D7%99%D7%9C%D7%99%D7%9D-%D7%95%D7%92%D7%A7%D7%98%D7%99%D7%9D?price=28_70&size=159515":
    {
      itemSelector: ".product",
      nameSelector: ".product-category-name",
      priceSelector: ".price-wrapper .price:not(:contains('0.00'))",
      imageSelector: ".gallery-img",
      URLSelector: "a",
      colorSelector: ".swatch-option",
      specificItemSelector: ".slick-track",
      imageItemSelector: ".img_zoom",
    },
};

// const [website, config] = Object.entries(websitesToScrape)[8];
// const scrapedData = await scrapeWebsite(website, config);
// console.log(scrapedData);

// const img = await getImages(
//   "https://www.hoodies.co.il/women/%D7%9E%D7%A2%D7%99%D7%9C%D7%99%D7%9D-%D7%95%D7%92%D7%A7%D7%98%D7%99%D7%9D/2196-039-2323-w",
//   config
// );
// console.log(img);

let url = getUrl("men", "shoes", ["44"], "black");
console.log(url);
