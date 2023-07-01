import express from "express";
import dotenv from "dotenv";
import db from "../index.js";
import bcrypt from "bcrypt";

dotenv.config();

const router = express.Router();
const saltRounds = 10
const password = process.env.BCRYPT_PASSWORD;

// Get all users
router.get("/", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT id, name, email, photo_id, bio, last_location FROM users");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Get a single user by ID
router.get("/:id", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [
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
    password,
    photo_id,
    bio,
    last_location,
  } = req.body;
  try {

    bcrypt
      .genSalt(saltRounds)
      .then(salt => {
        return bcrypt.hash(password, salt)
      })
      .then(async password_hash => {
        res.status(400).send("");
        const { rows } = await db.query(
          "INSERT INTO users (name, email, password_hash, photo_id, bio, last_location) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
          [
            name,
            email,
            password_hash,
            photo_id,
            bio,
            last_location,
          ]
        );
        res.status(201).json(rows[0]);
      })
      .catch(err => console.error(err.message))
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
    photo_id,
    bio,
    last_location,
  } = req.body;
  try {
    const { rows } = await db.query(
      "UPDATE users SET name = $1, email = $2, photo_id = $3, bio = $4, last_location = $5 WHERE id = $6 RETURNING *",
      [
        name,
        email,
        photo_id,
        bio,
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
    res.status(500).send("Server Error");
  }
});

export default router;
