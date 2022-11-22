const knex = require('../services/connection');
const hashedPassword = require('../passwordHash');
const jwt = require('jsonwebtoken');

const verifyLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    console.log(authorization);

    if (!authorization || authorization === 'Bearer') {
        return res.status(401).json('Você não possui autorização para isso');
    }

}

module.exports = {
    verifyLogin
};