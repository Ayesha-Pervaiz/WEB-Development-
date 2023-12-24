
let express = require("express");
let cookieParser = require("cookie-parser");
var session = require("express-session");
var expressLayouts = require("express-ejs-layouts");
let app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(session({ secret: "Shh, its a secret!" }));
app.use(require("./middlewares/common"));
//FINAL EXAM
const calculatorSession = require('./middlewares/calculator');
// const calculatorRoutes = require('./routes/calculatorRoutes');
// const calculation = require('../middlewares/calculation'); 


//Project
const maintenance = require("./middlewares/maintenance");
const logger = require("./middlewares/logger");
const sessionauth = require("./middlewares/sessionauth");
const admin = require("./middlewares/admin");
const gadgetsRouter = require('./routes/admin/gadgets');
// Use the gadgetsRouter for requests related to gadgets
app.use('/admin/gadgets', gadgetsRouter);
// app.use(logger);
app.get("/products", logger, function (req, res) {
  let products = [
    { title: "Marker", price: 700 },
    { title: "Pen", price: 300 },
    { title: "rubber", price: 100 },
    { title: "INK", price: 70 },
    { title: "Paper", price: 30 },
    { title: "Ruler", price: 100 },
  ];
  // app.use(maintenance);
  res.render("products/list", {
    pageTitle: "This is products list page",
    products: products,
  });
});
app.get("/contact-us", sessionauth, function (req, res, next) {
  res.render("contact-us");
  // next();
});
app.get("/gadgets", async (req, res) => {
  try {
      // Fetch gadgets from the database
      const GadgetModel = require("./models/gadgets");
      const fetchedGadgets = await GadgetModel.find(); // Use a different variable name

      // Render EJS template with gadgets data
      res.render('gadgets/list', { gadgets: fetchedGadgets });
  } catch (err) {
      console.error('Error fetching gadgets:', err.message);
      res.status(500).send('Internal Server Error');
  }
});

app.get("/admin/maintenance", sessionauth, function (req, res, next) {
  res.render("admin/maintenance");
  next();
});
app.get("/views", (req, res) => {
  let visits = req.cookies.visits;

  if (!visits) visits = 1;
  else visits = visits + 1;
  res.cookie("visits", visits);
  res.send({ visits });
});
const Car = require("./models/car");

app.get("/posts/:month/:day", function (req, res) {
  return res.send(req.params);
});
let carsApiRouter = require("./routes/api/cars");
let booksApiRouter = require("./routes/api/books");
app.use(carsApiRouter);
app.use(booksApiRouter);
app.use("/admin", sessionauth, admin, require("./routes/admin/books"));
app.use("/admin", sessionauth, admin, require("./routes/admin/gadgets"));
app.use("/", require("./routes/site/auth"));
app.use("/", require("./routes/site/books"));

app.use("/", require("./routes/site/books"));
app.get("/Articles", async function (req, res) {
  let Book = require("./models/book");
  let books = await Book.find();
  res.render("Articles/list", { books });
});
app.get("/", async function (req, res) {
  res.render("Landing-page");
});
//FINAL EXAM

// Use the session middleware from calculator.js
app.use(calculatorSession);

// Store results in session
app.post('/calculate', (req, res) => {
    const { operand1,operation,operand2 } = req.body;
    let result;

    // Calculations
    switch (operation) {
        case '+':
            result = Number(operand1) + Number(operand2);
            break;
        case '-':
            result = Number(operand1) - Number(operand2);
            break;
        case '*':
            result = Number(operand1) * Number(operand2);
            break;
        case '/':
            result = Number(operand1) / Number(operand2);
            break;
        default:
            result = 'Invalid operation';
    }

    const newCalculation = {
        operand1,
        operation,
        operand2,
        result
    };

    // Store calculation in session array
    if (!req.session.results) {
        req.session.results = [];
    }
    req.session.results.push(newCalculation);
    res.redirect('/calculator');
});

// app.use('/', calculatorRoutes);

//Serve
app.get('/calculator', (req, res) => {
    res.render('calculator', { results: req.session.results });
});

//

//MongoDB
const mongoose = require("mongoose");
const { cookie } = require("express/lib/response");
mongoose
  .connect("mongodb://127.0.0.1:27017/sp21-bcs-091-b", { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo...."))
  .catch((error) => console.log(error.message));
app.listen(5000, function () {
  console.log("Server started at localhost:5000");
});





