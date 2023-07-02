import express from "express";
import dotenv from "dotenv";
import db from "../index.js";
dotenv.config();

const router = express.Router();

// Get all connections
router.get("/", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM connections");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

// Get all connections by user ID
router.get("/all/user/:id", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM connections WHERE user_id = $1", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Connection not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

// Get latest connections by user ID
router.get("/user/:id", async (req, res) => {
  try {
    // const { rows } = await db.query("SELECT * FROM connections WHERE user_id = $1 order by connection_time desc limit 1", [
    //   req.params.id,
    // ]);
    const { rows } = await db.query("select id from connections");

    let start = Math.floor(Math.random() * (rows.length/2))
    let end = Math.floor(Math.random() * (rows.length) + (rows.length)/2)
    
    if (rows.length === 0) {
      return res.status(404).json({ message: "Connection not found" });
    }
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

// Create a new connection
router.post("/", async (req, res) => {
  const {
    user_id,
    connection_ids,
  } = req.body;
  try {
    const { rows } = await db.query(
      "INSERT INTO connections (user_id, connection_ids) VALUES ($1, $2) RETURNING *",
      [
        user_id,
        connection_ids,
      ]
    );
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
});

export default router;
