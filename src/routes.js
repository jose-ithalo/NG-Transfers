const express = require('express');

const { registerUser } = require('./controllers/users');

const routes = express();

routes.get('/', function (req, res) {
    res.status(201).json('MSG DE ROUTES');
});

routes.post('/register', registerUser);

module.exports = routes;