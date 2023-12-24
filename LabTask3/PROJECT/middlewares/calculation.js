// calculatorMiddleware.js
module.exports=function (req, res, next) {
    const { operand1, operation, operand2 } = req.body;
    let result;

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

    if (!req.session.results) {
        req.session.results = [];
    }
    req.session.results.push(newCalculation);
    res.redirect('/calculator');
}

