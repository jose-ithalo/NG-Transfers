const knex = require('../services/connection');

const viewTransactions = async (req, res) => {
    const { accountid } = req.user;
    const { date, cashOut, cashIn } = req.body;

    if (!date && cashOut === false && cashIn === false) {

        try {

            const userTransaction = await knex('transactions')
                .where({ debitedaccountid: accountid })
                .orWhere({ creditedaccountid: accountid });

            // const { createdat: _, ...formatedTransaction } = userTransaction;

            if (userTransaction.length === 0) {
                return res.status(404).json('Nenhuma transação encontrada.');
            }

            return res.status(200).json(userTransaction);

        } catch (error) {
            return res.status(400).json(error.message);
        }

    } else {

        if (date) {

            console.log(date);

            const chosenDate = await knex('transactions').where({ createdat: date });

            return res.status(200).json(chosenDate);

        }

        if (cashOut === true) {

            const cashOutData = await knex('transactions').where({ debitedaccountid: accountid });

            return res.status(200).json(cashOutData);
        }

        if (cashIn === true) {

            const cashInData = await knex('transactions').where({ creditedaccountid: accountid });

            return res.status(200).json(cashInData);
        }

        return res.status(200).json('Informações digitadas.');
    }

}


module.exports = {
    viewTransactions
}