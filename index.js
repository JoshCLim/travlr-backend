import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import users from "./routes/users.js";
import photos from "./routes/photos.js";
import filters from "./routes/filters.js";
import locations from "./routes/locations.js";
import auth from "./routes/auth.js";
import pkg from "pg";
dotenv.config();

const corsOptions = {
  origin: ["http://localhost:3000", "travlr.vercel.app"],
};

const app = express();
const port = 8000;
app.use(cors(corsOptions));
app.use(express.json());

const db = new pkg.Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DBNAME,
});
await db.connect();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", users);
app.use("/photos", photos);
app.use("/locations", locations);
app.use("/filters", filters);
app.use("/auth", auth);

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});

export default db;
