import express from "express";
import dotenv from "dotenv";
import users from "./routes/users.js";
dotenv.config();

const app = express();
const port = 8000;

import pkg from "pg";

const client = new pkg.Client({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DBNAME,
});
await client.connect();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", users);

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
