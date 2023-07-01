import express from "express";
import db from "../index.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  const { name, email, password, photo_id, bio, last_location } = req.body;
  try {
    bcrypt
      .genSalt(saltRounds)
      .then((salt) => {
        return bcrypt.hash(password, salt);
      })
      .then(async (password_hash) => {
        const { rows } = await db.query(
          "INSERT INTO users (name, email, password_hash, photo_id, bio, last_location) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
          [name, email, password_hash, photo_id, bio, last_location]
        );
        res.status(201).json(rows[0]);
      });
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

// User login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { rows } = await db.query(
      "SELECT id, name, email, password_hash, photo_id, bio, last_location FROM users WHERE email = $1",
      [email]
    );
    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];

    // Compare the inputted password with the hashed password stored in the database
    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password_hash.toString()
    );
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Remove the password_hash field for security purposes
    const users = rows.map((user) => {
      delete user.password_hash;
      return user;
    });

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

export default router;
