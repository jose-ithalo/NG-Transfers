const knex = require('../services/connection');

const registerUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
    }

    try {

        const existingUser = await knex('users').where('username', username).first();

        if (existingUser) {
            return res.status(406).json('Este usuário já existe, não será possível cadastrá-lo');
        }

        if (username.length < 3) {
            return res.status(406).json('O seu username deve conter pelo menos 3 caracteres');
        }

        if (password.length < 8) {
            return res.status(406).json('A senha deve ser composta de pelo menos 8 caracteres.');
        }

        if (!password.match(/[A-Z]/) || !password.match(/[a-z]/) || !password.match(/[0-9]/)) {
            return res.status(406).json('Utilize letras maiúsculas, minúsculas e números para criação da senha.');
        };

        await knex('users').insert({ username, password });

        return res.status(200).json('Usuário cadastrada com sucesso!');

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = {
    registerUser
}