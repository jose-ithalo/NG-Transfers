const express = require('express');

const app = express();
app.use(express.json());

app.get('/', function (req, res) {
    res.send('Funcionando...')
});

app.listen(3000, function () {
    console.log('Server on working...')
});