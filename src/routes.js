const express = require('express');

const login = require('./controllers/login');
const { registerUser } = require('./controllers/users');
const { verifyLogin } = require('./filters/verifyLogin');
const { viewBalance, cashOut } = require('./controllers/accounts');

const routes = express();

routes.get('/', function (req, res) {
    res.status(201).json('MSG DE ROUTES');
});

routes.post('/register', registerUser);

routes.post('/login', login);

routes.use(verifyLogin);

routes.get('/balance', viewBalance);

routes.post('/transfer', cashOut);

module.exports = routes;