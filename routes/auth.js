import db from "../index.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

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

export default router;
