import express from "express";
import dotenv from "dotenv";
import db from "../index.js";
dotenv.config();

const router = express.Router();

// Get all photos
router.get("/", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM photos");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

// Get all photos by user ID
router.get("/user/:id", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM photos WHERE user_id = $1", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Photo not found" });
    }
    console.log(rows);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

// Get a single photo by photo ID
router.get("/:id", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM photos WHERE id = $1", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Photo not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

// Create a new photo
router.post("/", async (req, res) => {
  const {
    user_id,
    url,
  } = req.body;
  try {
    const { rows } = await db.query(
      "INSERT INTO photos (user_id, url) VALUES ($1, $2) RETURNING *",
      [
        user_id,
        url,
      ]
    );
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

// Update a photo
router.put("/:id", async (req, res) => {
  const {
    user_id,
    url,
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
      "UPDATE photos SET user_id = $1, url = $2, food = $3, nature = $4, adventure = $5, culture = $6, exercise = $7, tourist_hotspot = $8, cozy = $9, family = $10, wildlife = $11 WHERE id = $12 RETURNING *",
      [
        user_id,
        url,
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
      return res.status(404).json({ message: "Photo not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

// Delete a photo
router.delete("/:id", async (req, res) => {
  try {
    const { rows } = await db.query(
      "DELETE FROM photos WHERE id = $1 RETURNING *",
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Photo not found" });
    }
    res.json({ message: "Photo deleted" });
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

export default router;
