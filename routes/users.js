import express from "express";
import dotenv from "dotenv";
import db from "../index.js";

dotenv.config();

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT id, name, email, photo_id, bio, last_location FROM users"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

// Get a single user by ID
router.get("/:id", async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT id, name, email, photo_id, bio, last_location FROM users WHERE id = $1",
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

// Update a user
router.put("/:id", async (req, res) => {
  const { name, email, photo_id, bio, last_location } = req.body;
  try {
    const { rows } = await db.query(
      "UPDATE users SET name = $1, email = $2, photo_id = $3, bio = $4, last_location = $5 WHERE id = $6 RETURNING *",
      [name, email, photo_id, bio, last_location, req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

// Delete a user
router.delete("/:id", async (req, res) => {
  try {
    const { rows } = await db.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

export default router;
