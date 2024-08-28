import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import userRegister from "./routes/userRegister.js";
import userLogin from "./routes/userLogin.js";
import user from "./routes/user.js";
import details from "./routes/details.js";
import password from "./routes/password.js";
import searchResults from "./routes/searchResults.js";
import email from "./routes/email.js";
import reset from "./routes/resetPass.js";
import itemDetails from "./routes/itemDetails.js";
import storeRoutes from "./routes/addresses.js";
import recommendation from "./routes/recommendation.js";
import popularSearches from "./services/popularSearches.js";
import popularSearchesWS from "./WebScraping/popularSearchesWS.js";
import { scheduleNightlyScraper } from "./WebScraping/nightScrap.js";

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const { CONNECTION_STRING, PORT } = process.env;

// Routes
app.use("/api", userRegister);
app.use("/api", userLogin);
app.use("/api", user);
app.use("/api", details);
app.use("/api", password);
app.use("/api", searchResults);
app.use("/api", email);
app.use("/api", reset);
app.use("/api", itemDetails);
app.use("/api", storeRoutes);
app.use("/api", recommendation);

app.use(express.static("public"));

const client = new MongoClient(CONNECTION_STRING);

async function initialize() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log("Connected to the database");

    // Call the createPopularSearches function after the database connection is established
    await popularSearches.createPopularSearches();

    // Save popular searches
    await popularSearchesWS.savePopularSearches();

    // Schedule the nightly scraper
    scheduleNightlyScraper();
  } catch (error) {
    console.error("Error initializing the application", error);
  }
}

initialize();

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
