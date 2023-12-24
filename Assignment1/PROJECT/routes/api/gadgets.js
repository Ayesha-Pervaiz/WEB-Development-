const express = require("express");
let router = express.Router();
let gadgets = require("../../models/gadgets");
router.get("/api/gadgets/:id", async function (req, res) {
  //return res.send(req.params);
  let gadgets = await gadgets.findById(req.params.id);
  res.send(gadgets);
});

router.put("/api/gadgets/:id", async function (req, res) {
  // return res.send(req.params);
  let gadgets = await gadgets.findById(req.params.id);
 gadgets.name = req.body.name;
  gadgets.desc = req.body.desc;
  gadgets.price = req.body.price;

  await gadgets.save();
  res.send(gadgets);
});
router.delete("/api/gadgets/:id", async function (req, res) {
  // return res.send(req.params);
  let gadgets = await gadgets.findByIdAndDelete(req.params.id);

  res.send(gadgets);
});
router.post("/api/gadgets", async function (req, res) {
  // res.send(req.body);
  let gadgets = new gadgets(req.body);
  await gadgets.save();
  return res.send(gadgets);
});
router.get("/api/gadgets", async function (req, res) {
  let gadgets = await gadgets.find();
  res.send(gadgets);
});
module.exports = router;
