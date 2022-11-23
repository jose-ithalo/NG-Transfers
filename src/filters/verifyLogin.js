const knex = require('../services/connection');
const hashedPassword = require('../passwordHash');
const jwt = require('jsonwebtoken');

const verifyLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || authorization === 'Bearer') {
        return res.status(401).json('Você não possui autorização. Faça o login');
    }

    try {

        const token = authorization.replace('Bearer', '').trim();

        const { accountid } = jwt.verify(token, hashedPassword);

        const loggedUser = await knex('users').where({ accountid }).first();

        if (!loggedUser) {
            return res.status(401).json('Acesso negado.');
        }

        const { password, ...userData } = loggedUser;

        req.user = userData;

        next();

    } catch (error) {
        return res.status(400).json(error.message);
    }

}

module.exports = {
    verifyLogin
};