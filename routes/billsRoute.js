const { json } = require("express");
const express = require("express");
const { get } = require("mongoose");
// const { default: Bills } = require("../client/src/pages/Bills");
const BillModel = require("../models/billModel");
// const app = express();
const router = express.Router();

router.post("/charge-bill", async (req, res) => {
  try {
    const newBill = new BillModel(req.body);
    await newBill.save();
    res.send("Bill charged  successfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/get-all-bills", async (req, res) => {
  try {
    const bills = await BillModel.find();
    res.send(bills);
    // console.log(bills);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
