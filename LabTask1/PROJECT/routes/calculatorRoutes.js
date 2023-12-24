// // calculatorRoutes.js

// const express = require('express');
// const router = express.Router();
// const { performCalculation } = require('./calculatorMiddleware');

// // Calculation endpoint
// router.post('/calculate', performCalculation);

// // Serve calculator page
// router.get('/calculator', (req, res) => {
//     res.render('calculator', { results: req.session.results });
// });

// module.exports = router;
// calculatorRoutes.js
const express = require('express');
const router = express.Router();
const { performCalculation } = require('./calculation');

router.post('/calculate', performCalculation);

module.exports = router;

