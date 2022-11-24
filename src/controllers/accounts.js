const knex = require('../services/connection');

const viewBalance = async (req, res) => {
    const { accountid } = req.user;

    try {

        const currentBalance = await knex('accounts').where({ id: accountid }).first();

        return res.status(200).json('Seu saldo é de: R$' + (currentBalance.balance / 100).toFixed(2));

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const cashOut = async (req, res) => {
    const { username, accountid } = req.user;
    const { value, recipient } = req.body;

    if (!value || !recipient) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
    }

    if (username === recipient) {
        return res.status(400).json({ mensagem: 'Não será possível fazer um cash-in para você mesmo.' })
    }

    try {

        const userAccount = await knex('accounts').where({ id: accountid }).first();
        const currentBalance = userAccount.balance / 100;

        if (value > currentBalance) {
            return res.status(400).json('Saldo insuficiente para transação.');
        }

        const balanceResult = currentBalance - value;

        return res.status(200).json(userAccount);

    } catch (error) {
        return res.status(400).json(error.message);
    }

}

module.exports = {
    viewBalance,
    cashOut
};