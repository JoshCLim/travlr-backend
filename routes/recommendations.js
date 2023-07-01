import express from "express";
import dotenv from "dotenv";
import db from "../index.js";
dotenv.config();

const router = express.Router();

// Get all recommendations
router.get("/", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM recommendations");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

// Get all recommendations by user ID
router.get("/all/user/:id", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM recommendations WHERE user_id = $1", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Recommendation not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

// Get latest recommendation by user ID
router.get("/user/:id", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM recommendations WHERE user_id = $1 order by recommended_time desc limit 1", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Recommendation not found" });
    }
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

// Create a new recommendation
router.post("/", async (req, res) => {
  const {
    user_id,
    location_ids,
  } = req.body;
  try {
    const { rows } = await db.query(
      "INSERT INTO recommendations (user_id, location_ids) VALUES ($1, $2) RETURNING *",
      [
        user_id,
        location_ids,
      ]
    );
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

export default router;
