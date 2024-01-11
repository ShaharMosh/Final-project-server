import express from 'express'
import customEnv from 'custom-env'
import http from 'http';

const app = express();

customEnv.env(process.env.NODE_ENV, './config')
console.log('CONNECTION_STRING:', process.env.CONNECTION_STRING)
console.log('PORT:', process.env.PORT)

app.use(express.static('public'))

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