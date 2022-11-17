const express = require('express');

const routes = express();

routes.get('/', function (req, res) {
    res.status(201).json('MSG DE ROUTES');
});

module.exports = routes;