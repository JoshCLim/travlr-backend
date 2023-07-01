import express from "express";
import dotenv from "dotenv";
import db from "../index.js";
dotenv.config();

const router = express.Router();

// Get all filters
router.get("/", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM filters");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

// Get a single filter by ID
router.get("/:id", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM filters WHERE id = $1", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Filter not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

// Create a new filter
router.post("/", async (req, res) => {
  const {
    num_travellers,
    accessibility,
    public_transport,
    driving,
    intensity,
  } = req.body;
  try {
    const { rows } = await db.query(
      "INSERT INTO filters (num_travellers, accessibility, public_transport, driving, intensity) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [num_travellers, accessibility, public_transport, driving, intensity]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

// Update a filter
router.put("/:id", async (req, res) => {
  const {
    num_travellers,
    accessibility,
    public_transport,
    driving,
    intensity,
  } = req.body;
  try {
    const { rows } = await db.query(
      "UPDATE filters SET num_travellers = $1, accessibility = $2, public_transport = $3, driving = $4, intensity = $5 WHERE id = $6 RETURNING *",
      [
        num_travellers,
        accessibility,
        public_transport,
        driving,
        intensity,
        req.params.id,
      ]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Filter not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

// Delete a filter
router.delete("/:id", async (req, res) => {
  try {
    const { rows } = await db.query(
      "DELETE FROM filters WHERE id = $1 RETURNING *",
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Filter not found" });
    }
    res.json({ message: "Filter deleted" });
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

export default router;
