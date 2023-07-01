import express from "express";
import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Create a PostgreSQL connection pool
const pool = new pkg.Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: 5433,
  database: process.env.POSTGRES_DBNAME,
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Get a single user by ID
router.get("/:id", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Create a new user
router.post("/", async (req, res) => {
  const {
    name,
    email,
    password_hash,
    photo_id,
    about,
    invalidate_tokens_before,
    last_location,
  } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO users (name, email, password_hash, photo_id, about, invalidate_tokens_before, last_location) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        name,
        email,
        password_hash,
        photo_id,
        about,
        invalidate_tokens_before,
        last_location,
      ]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Update a user
router.put("/:id", async (req, res) => {
  const {
    name,
    email,
    password_hash,
    photo_id,
    about,
    invalidate_tokens_before,
    last_location,
  } = req.body;
  try {
    const { rows } = await pool.query(
      "UPDATE users SET name = $1, email = $2, password_hash = $3, photo_id = $4, about = $5, invalidate_tokens_before = $6, last_location = $7 WHERE id = $8 RETURNING *",
      [
        name,
        email,
        password_hash,
        photo_id,
        about,
        invalidate_tokens_before,
        last_location,
        req.params.id,
      ]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Delete a user
router.delete("/:id", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

export default router;
