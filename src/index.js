const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const routes = require('./routes');

app.use(routes);

app.listen(3000, function () {
    console.log('Server on working...')
});