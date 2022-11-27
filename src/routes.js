const express = require('express');

const login = require('./controllers/login');
const { registerUser } = require('./controllers/users');
const { verifyLogin } = require('./filters/verifyLogin');
const { viewBalance, cashOut } = require('./controllers/accounts');
const { viewTransactions } = require('./controllers/transactions');

const routes = express();

routes.post('/register', registerUser);

routes.post('/login', login);

routes.use(verifyLogin);

routes.get('/balance', viewBalance);

routes.post('/transfer', cashOut);

routes.get('/transactions', viewTransactions);

module.exports = routes;