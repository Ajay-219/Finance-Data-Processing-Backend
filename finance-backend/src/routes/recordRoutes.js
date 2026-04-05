const express = require("express");
const router = express.Router();
const Record = require("../models/Record");
const auth = require("../middleware/auth");


// ✅ CREATE RECORD (Admin only)
router.post("/", auth(["admin"]), async (req, res) => {
  try {
    const { amount, type } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    if (!type) {
      return res.status(400).json({ error: "Type is required" });
    }

    const record = await Record.create(req.body);

    res.status(201).json(record);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ GET RECORDS
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 5, category, type } = req.query;

    const filter = {};

    if (type) filter.type = type;

    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }

    const records = await Record.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(records);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ UPDATE
router.put("/:id", async (req, res) => {
  try {
    const record = await Record.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.json(record);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ DELETE
router.delete("/:id", async (req, res) => {
  try {
    const record = await Record.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;