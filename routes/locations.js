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
    url,
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
  } = req.body;
  try {
    const { rows } = await db.query(
      "INSERT INTO locations (url, coordinates, food, nature, adventure, culture, exercise, tourist_hotspot, cozy, family, wildlife) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
      [
        url,
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
    url,
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
  } = req.body;
  try {
    const { rows } = await db.query(
      "UPDATE locations SET url = $1, coordinates = $2, food = $3, nature = $4, adventure = $5, culture = $6, exercise = $7, tourist_hotspot = $8, cozy = $9, family = $10, wildlife = $11 WHERE id = $12 RETURNING *",
      [
        url,
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
