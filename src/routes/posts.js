const express = require("express");
const pool = require("../db");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { caption } = req.body;

  const result = await pool.query(
    "INSERT INTO posts (user_id, caption) VALUES ($1, $2) RETURNING *",
    [req.user.id, caption]
  );

  res.json(result.rows[0]);
});

router.get("/", auth, async (req, res) => {
  const posts = await pool.query(
    "SELECT * FROM posts ORDER BY created_at DESC"
  );

  res.json(posts.rows);
});

module.exports = router;
