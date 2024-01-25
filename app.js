import {
  scrapeWebsite,
  scrapeMultipleWebsites,
} from "./WebScraping/LongShirts/scrapeShirt.js";

import express from 'express'
import customEnv from 'custom-env'
import http from 'http';

const app = express();

import bodyParser from 'body-parser'
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

customEnv.env(process.env.NODE_ENV, './config')
console.log('CONNECTION_STRING:', process.env.CONNECTION_STRING)
console.log('PORT:', process.env.PORT)

import cors from 'cors'
app.use(cors());

import userRegister from './routes/userRegister.js'
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

app.use(express.static('public'));

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
server.listen(process.env.PORT)

// Example usage
const websitesToScrape = [
  {
    url: "https://www.castro.com/women/categories/tops_/_bodysuits/long_shirts",
    config: {
      //   productSelector: ".product-class",
      nameSelector: "#product_category_157204",
      //   priceSelector: ".price-class",
    },
  },
  //   {
  //     url: "https://website2.com",
  //     config: {
  //       productSelector: ".item-class",
  //       nameSelector: ".title-class",
  //       priceSelector: ".cost-class",
  //     },
  //   },
];

scrapeMultipleWebsites(websitesToScrape);
