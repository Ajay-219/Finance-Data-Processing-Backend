const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// CREATE USER
router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name) return res.status(400).json({ error: "Name required" });
    if (!email) return res.status(400).json({ error: "Email required" });

    const user = await User.create(req.body);
    res.status(201).json(user);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔥 LOGIN ROUTE (IMPORTANT)
router.post("/login", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "secretkey"
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/test", (req, res) => {
  res.send("User route working");
});

router.post("/test", (req, res) => {
  res.send("POST working");
});

module.exports = router;