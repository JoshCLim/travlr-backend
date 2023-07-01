import express from "express";
import dotenv from "dotenv";
import db from "../index.js";
dotenv.config();

const router = express.Router();

// Get all locations
router.get("/", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM locations");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

// Get a single location by ID
router.get("/:id", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM locations WHERE id = $1", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

// Create a new location
router.post("/", async (req, res) => {
  const {
    name,
    photo_url,
    coordinates,
    food,
    nature,
    adventure,
    culture,
    exercise,
    tourist_hotspot,
    cozy,
    family,
    wildlife,
    cbd,
    disabled_accessibility,
  } = req.body;
  try {
    const { rows } = await db.query(
      "INSERT INTO locations (name, photo_url, coordinates, food, nature, adventure, culture, exercise, tourist_hotspot, cozy, family, wildlife, cbd, disabled_accessibility) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *",
      [
        name,
        photo_url,
        coordinates,
        food,
        nature,
        adventure,
        culture,
        exercise,
        tourist_hotspot,
        cozy,
        family,
        wildlife,
        cbd,
        disabled_accessibility,
      ]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

// Update a location
router.put("/:id", async (req, res) => {
  const {
    name,
    photo_url,
    coordinates,
    food,
    nature,
    adventure,
    culture,
    exercise,
    tourist_hotspot,
    cozy,
    family,
    wildlife,
    cbd,
    disabled_accessibility,
  } = req.body;
  try {
    const { rows } = await db.query(
      "UPDATE locations SET name = $1, photo_url = $2, coordinates = $3, food = $4, nature = $5, adventure = $6, culture = $7, exercise = $8, tourist_hotspot = $9, cozy = $10, family = $11, wildlife = $12, cbd = $13, disabled_accessibility = $14 WHERE id = $15 RETURNING *",
      [
        name,
        photo_url,
        coordinates,
        food,
        nature,
        adventure,
        culture,
        exercise,
        tourist_hotspot,
        cozy,
        family,
        wildlife,
        cbd,
        disabled_accessibility,
        req.params.id,
      ]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

// Delete a location
router.delete("/:id", async (req, res) => {
  try {
    const { rows } = await db.query(
      "DELETE FROM locations WHERE id = $1 RETURNING *",
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.json({ message: "Location deleted" });
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

export default router;
