import express from "express";
import dotenv from "dotenv";
import db from "../index.js";
dotenv.config();

const router = express.Router();

// Get all preferences
router.get("/", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM preferences");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

// Get a single preference by ID
router.get("/:id", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM preferences WHERE id = $1", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Preference not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

// Create a new preference
router.post("/", async (req, res) => {
  const {
    user_id,
    food,
    nature,
    adventure,
    culture,
    exercise,
    tourist_hotspot,
    cozy,
    family,
    wildlife,
    near_cbd,
    disabled_accessibility,
  } = req.body;
  try {
    const { rows } = await db.query(
      "INSERT INTO preferences (user_id, food, nature, adventure, culture, exercise, tourist_hotspot, cozy, family, wildlife, near_cbd, disabled_accessibility) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
      [
        user_id,
        food,
        nature,
        adventure,
        culture,
        exercise,
        tourist_hotspot,
        cozy,
        family,
        wildlife,
        near_cbd,
        disabled_accessibility,
      ]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

// Update a preference
router.put("/:id", async (req, res) => {
  const {
    user_id,
    food,
    nature,
    adventure,
    culture,
    exercise,
    tourist_hotspot,
    cozy,
    family,
    wildlife,
    near_cbd,
    disabled_accessibility,
  } = req.body;
  try {
    const { rows } = await db.query(
      "UPDATE preferences SET user_id = $1, food = $2, nature = $3, adventure = $4, culture = $5, exercise = $6, tourist_hotspot = $7, cozy = $8, family = $9, wildlife = $10, near_cbd = $11, disabled_accessibility = $12 WHERE id = $13 RETURNING *",
      [
        user_id,
        food,
        nature,
        adventure,
        culture,
        exercise,
        tourist_hotspot,
        cozy,
        family,
        wildlife,
        near_cbd,
        disabled_accessibility,
        req.params.id,
      ]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Preference not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

// Delete a preference
router.delete("/:id", async (req, res) => {
  try {
    const { rows } = await db.query(
      "DELETE FROM preferences WHERE id = $1 RETURNING *",
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Preference not found" });
    }
    res.json({ message: "Preference deleted" });
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

export default router;
