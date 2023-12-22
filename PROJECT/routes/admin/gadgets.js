const express = require("express");
let router = express.Router();
let gadgets = require("../../models/gadgets");

//route to deliver an edit form
router.get("/gadgets/edit/:id", async (req, res) => {
  let gadgets = await gadgets.findById(req.params.id);
  res.render("admin/gadgets/edit", { layout: "adminlayout", gadgets });
});
router.post("/gadgets/edit/:id", async (req, res) => {
  let error = gadgets.validate(req.body);
  if (error) {
    req.session.flash = { type: "success", message: error.details[0].message };
    return res.redirect("back");
  }
  let gadgets= await gadgets.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/admin/gadgets");
});

//route to delete a book
router.get("/gadgets/delete/:id", async (req, res) => {
  let gadgets = await gadgets.findByIdAndDelete(req.params.id);
  req.session.flash = { type: "danger", message: "Gadgets Deleted!" };
  res.redirect("/admin/gadgets");
});

router.get("/gadgets/add", async (req, res) => {
  res.render("admin/gadgets/add", { layout: "adminlayout" });
});
router.post("/gadgets/add", async (req, res) => {
  let error = gadgets.validate(req.body);
  if (error) {
    req.session.flash = { type: "success", message: error.details[0].message };
    return res.redirect("back");
  }
  let gadgets = new gadgets(req.body);
  await gadgets.save();
  req.session.flash = { type: "success", message: "GadgetSaved!" };
  res.redirect("/admin/gadgets");
});
router.get("/gadgets/:page?", async (req, res) => {
  let page = req.params.page ? req.params.page : 1;
  page = Number(page);
  let pageSize = 3;
  let gadgets = await gadgets.find()
    .limit(pageSize)
    .skip((page - 1) * pageSize);
  let gadgetsCount = await gadgets.countDocuments();
  let totalPages = Math.ceil(gadgetsCount / pageSize);
  res.render("admin/gadgets/index", {
    layout: "adminlayout",
    books,
    page,
    totalPages,
  });
});
module.exports = router;


