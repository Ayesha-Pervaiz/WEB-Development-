// const express = require("express");
// let router = express.Router();
// let gadgets = require("../../models/gadgets");

// //route to deliver an edit form
// router.get("/gadgets/edit/:id", async (req, res) => {
//   let gadgets = await gadgets.findById(req.params.id);
//   res.render("admin/gadgets/edit", { layout: "adminlayout", gadgets });
// });
// // router.get('/', async (req, res) => {
// //   try {
// //     let gadgets = await Gadgets.find(); // Fetch gadgets from the model
// //     res.render('admin/gadgets/index', { gadgets });
// //   } catch (err) {
// //     console.error(err);
// //     // Handle errors or send an error response
// //     res.status(500).send('Internal Server Error');
// //   }
// // });
// router.post("/gadgets/edit/:id", async (req, res) => {
//   let error = gadgets.validate(req.body);
//   if (error) {
//     req.session.flash = { type: "success", message: error.details[0].message };
//     return res.redirect("back");
//   }
//   let gadgets= await gadgets.findByIdAndUpdate(req.params.id, req.body);
//   res.redirect("/admin/gadgets");
// });

// //route to delete a book
// router.get("/gadgets/delete/:id", async (req, res) => {
//   let gadgets = await gadgets.findByIdAndDelete(req.params.id);
//   req.session.flash = { type: "danger", message: "Gadgets Deleted!" };
//   res.redirect("/admin/gadgets");
// });

// router.get("/gadgets/add", async (req, res) => {
//   res.render("admin/gadgets/add", { layout: "adminlayout" });
// });
// router.post("/gadgets/add", async (req, res) => {
//   let error = gadgets.validate(req.body);
//   if (error) {
//     req.session.flash = { type: "success", message: error.details[0].message };
//     return res.redirect("back");
//   }
//   let gadgets = new gadgets(req.body);
//   await gadgets.save();
//   req.session.flash = { type: "success", message: "GadgetSaved!" };
//   res.redirect("/admin/gadgets");
// });
// router.get("/gadgets/:page?", async (req, res) => {
//   let page = req.params.page ? req.params.page : 1;
//   page = Number(page);
//   let pageSize = 3;
//   let gadgets = await gadgets.find()
//     .limit(pageSize)
//     .skip((page - 1) * pageSize);
//   let gadgetsCount = await gadgets.countDocuments();
//   let totalPages = Math.ceil(gadgetsCount / pageSize);
//   res.render("admin/gadgets/index", {
//     layout: "adminlayout",
//     books,
//     page,
//     totalPages,
//   });
// });
// module.exports = router;

const express = require("express");
const router = express.Router();
const Gadgets = require("../../models/gadgets");

// Route to deliver an edit form
router.get("/gadgets/edit/:id", async (req, res) => {
  let gadget = await Gadgets.findById(req.params.id);
  res.render("admin/gadgets/edit", { layout: "adminlayout", gadget });
});

router.post("/gadgets/edit/:id", async (req, res) => {
  let error = Gadgets.validate(req.body);
  if (error) {
    req.session.flash = { type: "success", message: error.details[0].message };
    return res.redirect("back");
  }
  let gadgetUpdated = await Gadgets.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/admin/gadgets");
});

// Route to delete a gadget
router.get("/gadgets/delete/:id", async (req, res) => {
  let gadgetDeleted = await Gadgets.findByIdAndDelete(req.params.id);
  req.session.flash = { type: "danger", message: "Gadget Deleted!" };
  res.redirect("/admin/gadgets");
});

router.get("/gadgets/add", async (req, res) => {
  res.render("admin/gadgets/add", { layout: "adminlayout" });
});

router.post("/gadgets/add", async (req, res) => {
  let error = Gadgets.validate(req.body);
  if (error) {
    req.session.flash = { type: "success", message: error.details[0].message };
    return res.redirect("back");
  }
  let newGadget = new Gadgets(req.body);
  await newGadget.save();
  req.session.flash = { type: "success", message: "Gadget Saved!" };
  res.redirect("/admin/gadgets");
});

router.get("/gadgets/:page?", async (req, res) => {
  let page = req.params.page ? req.params.page : 1;
  page = Number(page);
  let pageSize = 5;
  let gadgets = await Gadgets.find()
    .limit(pageSize)
    .skip((page - 1) * pageSize);
  let gadgetsCount = await Gadgets.countDocuments();
  let totalPages = Math.ceil(gadgetsCount / pageSize);
  res.render("admin/gadgets/index", {
    layout: "adminlayout",
    gadgets,
    page,
    totalPages,
  });
});

module.exports = router;








