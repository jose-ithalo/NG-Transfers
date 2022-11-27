const knex = require('../services/connection');

const viewTransactions = async (req, res) => {
    const { accountid } = req.user;

    try {

        const userTransaction = await knex('transactions')
            .where({ debitedaccountid: accountid })
            .orWhere({ creditedaccountid: accountid });

        return res.status(200).json(userTransaction);

    } catch (error) {
        return res.status(400).json(error.message);
    }

}

module.exports = {
    viewTransactions
}