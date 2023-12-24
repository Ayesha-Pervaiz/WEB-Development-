// calculator.js

const session = require('express-session');

const calculatorSession = session({
    secret: 'secret-key', // Change this to a secure key
    resave: false,
    saveUninitialized: true
});

module.exports = calculatorSession;
