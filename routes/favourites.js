import express from "express";
import dotenv from "dotenv";
import db from "../index.js";
dotenv.config();

const router = express.Router();

// Get all favourites
router.get("/", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM favourites");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

// Get a single favourite by user ID
router.get("/user/:id", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM favourites WHERE user_id = $1", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Favourite not found" });
    }
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

// Create a new favourite
router.post("/", async (req, res) => {
  const {
    user_id,
    location_id,
  } = req.body;
  try {
    const { rows } = await db.query(
      "INSERT INTO favourites (user_id, location_id) VALUES ($1, $2) RETURNING *",
      [
        user_id,
        location_id,
      ]
    );
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

export default router;
