const express = require('express');

const { registerUser } = require('./controllers/users');
const login = require('./controllers/login');

const routes = express();

routes.get('/', function (req, res) {
    res.status(201).json('MSG DE ROUTES');
});

routes.post('/register', registerUser);

routes.post('/login', login);

module.exports = routes;