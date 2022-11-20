const knex = require('../services/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordHash = require('../passwordHash');

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
    }

    try {

        const foundUser = await knex('users').where('username', username);

        if (foundUser.length === 0) {
            return res.status(404).json('Usuário ou senha não confere.');
        }

        const correctPassword = await bcrypt.compare(password, foundUser[0].password);

        if (!correctPassword) {
            return res.status(400).json('Usuário ou senha não confere.');
        }

        const token = jwt.sign({ id: foundUser[0].id }, passwordHash, { expiresIn: '24h' });

        const { password: _, ...userData } = foundUser[0];

        return res.status(200).json({
            userData,
            token
        });

    } catch (error) {
        return res.status(400).json(error.message);
    }

}

module.exports = login;