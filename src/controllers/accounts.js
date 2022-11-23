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

module.exports = {
    viewBalance
};