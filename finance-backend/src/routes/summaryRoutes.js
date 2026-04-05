const express = require("express");
const router = express.Router();
const Record = require("../models/Record");

// Summary API
router.get("/", async (req, res) => {
  const records = await Record.find();

  let income = 0;
  let expense = 0;

  records.forEach(r => {
    if (r.type === "income") income += r.amount;
    else expense += r.amount;
  });

  res.json({
    totalIncome: income,
    totalExpense: expense,
    netBalance: income - expense
  });
});

module.exports = router;