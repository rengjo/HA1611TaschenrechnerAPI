const express = require('express');
const cors = require('cors'); // Füge diese Zeile hinzu
const app = express();

let port = 3000;

app.use(cors()); // Aktiviere CORS

app.get('/add/:num1/:num2', (req, res) => {
    const num1 = parseFloat(req.params.num1);
    const num2 = parseFloat(req.params.num2);
    let result = "";
    if (isNaN(num1) || isNaN(num2)) {
        res.status(400).json({ error: 'Invalid Data Type' });
    } else {
        result = num1 + num2;
        res.json({ result });
    }
});

app.get('/sub/:num1/:num2', (req, res) => {
    performOperation(req, res, '-');
});

app.get('/mul/:num1/:num2', (req, res) => {
    performOperation(req, res, '*');
});

app.get('/div/:num1/:num2', (req, res) => {
    performOperation(req, res, '/');
});

function performOperation(req, res, operation) {
    const num1 = parseFloat(req.params.num1);
    const num2 = parseFloat(req.params.num2);
    let result = "";

    if (isNaN(num1) || isNaN(num2)) {
        res.status(400).json({ error: 'Invalid Data Type' });
    } else {
        switch (operation) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 === 0) {
                    res.status(400).json({ error: 'Division by zero is not allowed' });
                    return;
                }
                result = num1 / num2;
                break;
            default:
                res.status(400).json({ error: 'Invalid Operation' });
                return;
        }

        res.json({ result });
    }
}

app.listen(port, () => {
    console.log(`Taschenrechner API started on port ${port}`);
});
