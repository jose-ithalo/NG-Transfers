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

    const registeredBeneficiary = await knex('users').where({ username: recipient }).first();

    try {

        if (!registeredBeneficiary) {
            return res.status(404).json('Benefiário não encontrado. Verifique o nome digitado.')
        }

        const userAccount = await knex('accounts').where({ id: accountid }).first();

        if (!userAccount) {
            return res.status(404).json('Erro! Conta não encontrada.')
        }

        const currentBalance = userAccount.balance / 100;

        if (value > currentBalance) {
            return res.status(400).json('Saldo insuficiente para transação.');
        }

        const remainingBalance = currentBalance - value;

        await knex('accounts').update({ balance: remainingBalance * 100 }).where({ id: accountid });

        const beneficiaryAccount = await knex('accounts').where({ id: registeredBeneficiary.accountid }).first();

        const beneficiaryBalance = beneficiaryAccount.balance + (value * 100);

        await knex('accounts').update({ balance: beneficiaryBalance }).
            where({ id: registeredBeneficiary.accountid });

    } catch (error) {
        return res.status(400).json('Erro na transação.');
    }

    try {

        await knex('transactions').
            insert({ debitedaccountid: accountid, creditedaccountid: registeredBeneficiary.accountid, value })

    } catch (error) {
        return res.status(400).json(error.message);
    }

    return res.status(200).json('Cash-out realizado com sucesso!');
}

module.exports = {
    viewBalance,
    cashOut
};